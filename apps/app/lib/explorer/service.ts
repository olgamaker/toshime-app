import type { Currency } from "@repo/lib/config/currency";
import { NetworkType } from "@repo/lib/config/network";

const TOKEN = process.env.BLOCKCYPHER_TOKEN as string;

function getExplorerPrefix(networkType: NetworkType): string {
	switch (networkType) {
		case NetworkType.MAINNET:
			return "mainnet";
		case NetworkType.TESTNET:
			return "test3";
		default:
			throw new Error(
				`Unsupported network type for explorer prefix: ${networkType}`,
			);
	}
}

export function buildBalanceUrl(
	address: string,
	networkType: NetworkType,
	curency: Currency,
) {
	const prefix = getExplorerPrefix(networkType);
	return `https://api.blockcypher.com/v1/${curency.toLowerCase()}/${prefix}/addrs/${address}/balance?token=${TOKEN}`;
}

export function buildTransactionUrl(
	address: string,
	networkType: NetworkType,
	curency: Currency,
) {
	const prefix = networkType === NetworkType.MAINNET ? "main" : "test3";
	return `https://api.blockcypher.com/v1/${curency.toLowerCase()}/${prefix}/addrs/${address}/full?token=${TOKEN}`;
}
