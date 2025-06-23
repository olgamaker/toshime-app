import {
	type Currency,
	DEFAULT_NETWORK_CURRENCY,
} from "@repo/lib/config/currency";
import type { NetworkType } from "@repo/lib/config/network";
import { type NextRequest, NextResponse } from "next/server";
import { buildBalanceUrl } from "@/lib/explorer/service";

async function fetchConfirmedBalance(
	address: string,
	networkType: NetworkType,
	currency: Currency,
): Promise<number> {
	const balanceUrl = buildBalanceUrl(address, networkType, currency);

	const res = await fetch(balanceUrl);
	if (!res.ok) {
		console.error(`Failed to fetch balance for ${address}`);
		return 0;
	}

	const data = await res.json();

	// Only confirmed balance
	return data.final_balance / 1e8;
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { address, usedAddresses = [], networkType, currency } = body;

		if (!address || !networkType) {
			return NextResponse.json(
				{ error: "Missing address or networkType" },
				{ status: 400 },
			);
		}

		const allAddresses = Array.from(new Set([address, ...usedAddresses]));

		const balances = await Promise.all(
			allAddresses.map((addr) =>
				fetchConfirmedBalance(
					addr,
					networkType,
					currency || DEFAULT_NETWORK_CURRENCY[networkType as NetworkType],
				),
			),
		);

		const total = balances.reduce((sum, val) => sum + val, 0);
		return NextResponse.json({ balance: total });
	} catch (err) {
		console.error("API /balance error:", err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
