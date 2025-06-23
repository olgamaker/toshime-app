import { NetworkType } from "@repo/lib/config/network";

export function getNetworkPaymentUrl(
	address: string,
	amount: number,
	networkType: NetworkType,
) {
	switch (networkType) {
		case NetworkType.MAINNET:
		case NetworkType.TESTNET:
			return `bitcoin:${address}?amount=${amount}`;
		default:
			throw new Error(`Unsupported network: ${networkType}`);
	}
}
