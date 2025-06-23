import { NetworkType } from "@repo/lib/config/network";
import { type Network, networks } from "bitcoinjs-lib";

/**
 * Map {@link NetworkType} to the corresponding bitcoinjs network object.
 */
export function getNetwork(networkType: NetworkType): Network {
	switch (networkType) {
		case NetworkType.MAINNET:
			return networks.bitcoin;
		case NetworkType.TESTNET:
			return networks.testnet;
		default:
			throw new Error(`Unsupported network type: ${networkType}`);
	}
}
