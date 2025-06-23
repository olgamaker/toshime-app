// app/api/request-received/route.ts

import {
	type Currency,
	DEFAULT_NETWORK_CURRENCY,
} from "@repo/lib/config/currency";
import type { NetworkType } from "@repo/lib/config/network";
import { type NextRequest, NextResponse } from "next/server";
import { buildTransactionUrl } from "@/lib/explorer/service";

export async function GET(req: NextRequest) {
	const address = req.nextUrl.searchParams.get("address");
	const networkType = req.nextUrl.searchParams.get("networkType");
	const currency =
		req.nextUrl.searchParams.get("currency") ||
		DEFAULT_NETWORK_CURRENCY[networkType as NetworkType];

	const startTime = req.nextUrl.searchParams.get("startTime");
	const amount = parseFloat(req.nextUrl.searchParams.get("amount") || "0");

	if (!address || !networkType || !startTime || !amount) {
		return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
	}

	const url = buildTransactionUrl(
		address,
		networkType as NetworkType,
		currency as Currency,
	);

	try {
		const res = await fetch(url);
		const data = await res.json();
		const txs = data.txs || [];

		let totalAfterTimestamp = 0;

		for (const tx of txs) {
			const txTime = tx.confirmed || tx.received;
			if (!txTime || new Date(txTime) < new Date(startTime)) continue;

			for (const output of tx.outputs || []) {
				if (output.addresses?.includes(address)) {
					totalAfterTimestamp += output.value / 1e8;
				}
			}
		}

		const received = totalAfterTimestamp >= amount;
		return NextResponse.json({ received });
	} catch (err) {
		console.error("BlockCypher fetch error:", err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
