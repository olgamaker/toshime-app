import { DEFAULT_ADDRESS_TYPE } from "@repo/lib/config/address";
import {
	DEFAULT_NETWORK_TYPE,
	type NetworkType,
} from "@repo/lib/config/network";
import type {
	AddressType,
	HDWallet,
	WalletResponse,
} from "@repo/lib/types/wallet";
import * as bitcoin from "bitcoinjs-lib";
import { getAccountPath, getDerivationPath } from "./derive";
import { getNetwork } from "./network";

/**
 * Generate an extended public key for the given wallet and network.
 */
export function generateXpub(wallet: HDWallet, network: NetworkType): string {
	const accountPath = getAccountPath(network); // m/84'/0'/0' or m/84'/1'/0'
	const accountNode = wallet.node.derivePath(accountPath); // must use bip32
	return accountNode.neutered().toBase58();
}

/**
 * Prepare a public wallet descriptor for sharing with clients.
 */
export function preparePublicWallet(
	wallet: HDWallet,
	networkType: NetworkType = DEFAULT_NETWORK_TYPE,
	addressType: AddressType = DEFAULT_ADDRESS_TYPE,
	index: number = 0,
): WalletResponse {
	const node = wallet?.node;
	if (!node) throw new Error("Wallet missing node");

	const path = getDerivationPath(networkType, addressType, index);
	const child = node.derivePath(path);
	if (!child?.publicKey) throw new Error("Missing public key");

	const pubkey = Buffer.from(child.publicKey);
	const network = getNetwork(networkType);

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
	if (!payment?.address) throw new Error("Failed to generate address");

	return {
		address: payment.address,
		publicKey: Buffer.from(child.publicKey).toString("hex"),
		networkType,
		addressType,
	};
}
