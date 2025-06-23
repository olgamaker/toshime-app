import type { BIP32Interface } from "bip32";
import type { NetworkType } from "../config/network";

export interface HDWallet {
	mnemonic: string;
	seed: Buffer;
	node: BIP32Interface;
}

export interface WalletResponse {
	address: string;
	addressType: AddressType;
	publicKey: string;
	networkType: NetworkType;
}

export type AddressType = "p2pkh" | "p2sh" | "p2wpkh" | "p2tr";

export interface IndexedAddress {
	index: number;
	address: string;
	networkType: NetworkType;
	addressType: AddressType;
}
