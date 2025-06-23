import { DEFAULT_ADDRESS_TYPE } from "@repo/lib/config/address";
import { DEFAULT_NETWORK_TYPE, NetworkType } from "@repo/lib/config/network";
import type { AddressType } from "@repo/lib/types/wallet";
import * as bip32 from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import { getNetwork } from "./network";

// Cache already-parsed extended public keys to avoid unnecessary re-parsing.
const nodeCache = new Map<string, bip32.BIP32Interface>();

/**
 * Return the BIP-44 account path for the given network.
 *
 * @param networkType - Bitcoin network the account belongs to.
 */
export function getAccountPath(networkType: NetworkType): string {
	const coinType = networkType === NetworkType.TESTNET ? "1'" : "0'";
	return `m/44'/${coinType}/0'`;
}

/**
 * Build the derivation path for a specific address.
 *
 * @param networkType - Bitcoin network the address is on.
 * @param type - Address type (p2pkh, p2sh, ...).
 * @param index - Derivation index.
 */
export function getDerivationPath(
	networkType: NetworkType,
	type: AddressType,
	index: number = 0,
): string {
	const derivationPaths = {
		[NetworkType.MAINNET]: {
			p2pkh: `m/44'/0'/0'/0/${index}`,
			p2sh: `m/49'/0'/0'/0/${index}`,
			p2wpkh: `m/84'/0'/0'/0/${index}`,
			p2tr: `m/86'/0'/0'/0/${index}`,
		},
		[NetworkType.TESTNET]: {
			p2pkh: `m/44'/1'/0'/0/${index}`,
			p2sh: `m/49'/1'/0'/0/${index}`,
			p2wpkh: `m/84'/1'/0'/0/${index}`,
			p2tr: `m/86'/1'/0'/0/${index}`,
		},
	};
	return derivationPaths[networkType][type];
}

/**
 * Derive a receiving address from an extended public key.
 *
 * @param xpub - Extended public key.
 * @param index - Address index.
 * @param networkType - Bitcoin network.
 * @param addressType - Desired address type.
 */
export function deriveAddress(
	xpub: string,
	index: number,
	networkType: NetworkType = DEFAULT_NETWORK_TYPE,
	addressType: AddressType = DEFAULT_ADDRESS_TYPE,
): string {
	if (!xpub || typeof xpub !== "string") {
		throw new Error("Invalid xpub provided");
	}

	if (!Number.isInteger(index) || index < 0) {
		throw new Error("Index must be a non-negative integer");
	}

	try {
		const network = getNetwork(networkType);
		if (!network) {
			throw new Error(`Unsupported network type: ${networkType}`);
		}

		let node = nodeCache.get(xpub);
		if (!node) {
			node = bip32.fromBase58(xpub, network);
			nodeCache.set(xpub, node);
		}

		const receivingNode = node.derive(0);
		const child = receivingNode.derive(index);
		const pubkey = child.publicKey;

		const paymentMap = {
			p2pkh: () => bitcoin.payments.p2pkh({ pubkey, network }),
			p2sh: () =>
				bitcoin.payments.p2sh({
					redeem: bitcoin.payments.p2wpkh({ pubkey, network }),
					network,
				}),
			p2wpkh: () => bitcoin.payments.p2wpkh({ pubkey, network }),
			p2tr: () => bitcoin.payments.p2tr({ pubkey, network }),
		} satisfies Record<AddressType, () => bitcoin.payments.Payment>;

		if (!(addressType in paymentMap)) {
			throw new Error(`Invalid address type: ${addressType}`);
		}

		const payment = paymentMap[addressType]();
		if (!payment.address) {
			throw new Error("Failed to generate address");
		}

		return payment.address;
	} catch (error) {
		throw new Error(`Error deriving address: ${(error as Error).message}`);
	}
}
