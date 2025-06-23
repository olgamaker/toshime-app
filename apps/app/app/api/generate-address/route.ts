import { DEFAULT_ADDRESS_TYPE } from "@repo/lib/config/address";
import { Currency, DEFAULT_NETWORK_CURRENCY } from "@repo/lib/config/currency";
import { DEFAULT_NETWORK_TYPE, NetworkType } from "@repo/lib/config/network";
import type { AddressType, IndexedAddress } from "@repo/lib/types/wallet";
import { deriveAddress } from "@repo/wallet/derive";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildBalanceUrl } from "@/lib/explorer/service";
import { getSessionCookie } from "@/lib/routes/session-cookie";

const GenerateAddressSchema = z.object({
	usedAddresses: z
		.array(z.object({ index: z.number(), address: z.string() }))
		.optional()
		.default([]),
	networkType: z.nativeEnum(NetworkType).default(DEFAULT_NETWORK_TYPE),
	currency: z
		.nativeEnum(Currency)
		.default(DEFAULT_NETWORK_CURRENCY[DEFAULT_NETWORK_TYPE]),
	addressType: z.string().default(DEFAULT_ADDRESS_TYPE),
});

async function checkAddressUsage(
	networkType: NetworkType,
	currency: Currency,
	address: string,
): Promise<boolean> {
	const url = buildBalanceUrl(address, networkType, currency);
	try {
		const response = await fetch(url, {
			headers: {
				"User-Agent": "Bitcoin-Wallet-App/1.0",
			},
		});

		if (!response.ok) {
			console.warn(
				`Address check failed with status ${response.status} for ${address}`,
			);
			return false;
		}

		const data = await response.json();
		return data.txrefs?.length > 0 || data.n_tx > 0;
	} catch (error) {
		console.error("Error checking address usage:", error);
		return false;
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = await getSessionCookie();
		console.log("Session retrieved:", session);

		if (!session?.wallet?.xpub) {
			console.error("Session validation failed:", {
				hasSession: !!session,
				hasWallet: !!session?.wallet,
				hasXpub: !!session?.wallet?.xpub,
			});
			return NextResponse.json(
				{ error: "No wallet found in session" },
				{ status: 400 },
			);
		}

		const xpub = session.wallet.xpub;
		console.log("Using xpub:", `${xpub.substring(0, 20)}...`);

		const body = await req.json();
		const parsed = GenerateAddressSchema.safeParse(body);

		if (!parsed.success) {
			console.error("Schema validation failed:", parsed.error.flatten());
			return NextResponse.json(
				{ error: "Invalid request", details: parsed.error.flatten() },
				{ status: 422 },
			);
		}

		const { usedAddresses, networkType, addressType, currency } = parsed.data;

		const usedIndices = usedAddresses
			.map((addr) => addr.index)
			.sort((a, b) => a - b);

		let nextIndex = 0;
		let newAddress = "";
		let isUsed = false;
		let attempts = 0;
		// Prevent infinite loops
		const maxAttempts = 100;

		do {
			if (attempts >= maxAttempts) {
				throw new Error("Maximum address generation attempts reached");
			}

			while (usedIndices.includes(nextIndex)) nextIndex++;

			newAddress = deriveAddress(
				xpub,
				nextIndex,
				networkType,
				addressType as AddressType,
			);

			console.log(`Checking address ${newAddress} at index ${nextIndex}`);

			isUsed = await checkAddressUsage(networkType, currency, newAddress);

			if (isUsed) {
				console.log(`Address ${newAddress} is already used, trying next index`);
				usedIndices.push(nextIndex);
				nextIndex++;
			}

			attempts++;
		} while (isUsed);

		const result = {
			address: newAddress,
			index: nextIndex,
			networkType,
			addressType: addressType as AddressType,
		} satisfies IndexedAddress;

		console.log("Generated new address:", result);

		return NextResponse.json(result);
	} catch (error) {
		console.error("Error generating address:", error);

		// More specific error handling
		if (error instanceof SyntaxError) {
			return NextResponse.json(
				{ error: "Invalid JSON in request body" },
				{ status: 400 },
			);
		}

		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Internal server error",
			},
			{ status: 500 },
		);
	}
}
