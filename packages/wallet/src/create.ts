import { DEFAULT_NETWORK_TYPE } from "@repo/lib/config/network";
import type { HDWallet } from "@repo/lib/types/wallet";
import * as bip32 from "bip32";
import * as bip39 from "bip39";
import { getNetwork } from "./network";

/**
 * Generate a hierarchical deterministic wallet.
 *
 * @param network - Target network. Defaults to {@link DEFAULT_NETWORK_TYPE}.
 * @param strength - Entropy strength for the mnemonic.
 * @param passphrase - Optional BIP-39 passphrase.
 */
export async function generateWallet(
	network = DEFAULT_NETWORK_TYPE,
	strength = 128,
	passphrase = "",
): Promise<HDWallet> {
	try {
		const mnemonic = bip39.generateMnemonic(strength);
		const seed = await bip39.mnemonicToSeed(mnemonic, passphrase);
		const node = bip32.fromSeed(seed, getNetwork(network));
		// @ts-ignore
		return { mnemonic, seed, node };
	} catch (error) {
		throw new Error(`Failed to generate wallet: ${(error as Error).message}`);
	}
}
