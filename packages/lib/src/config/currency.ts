import { NetworkType } from "./network";

export enum Currency {
	BTC = "BTC",
}

export const DEFAULT_NETWORK_CURRENCY = {
	[NetworkType.MAINNET]: Currency.BTC,
	[NetworkType.TESTNET]: Currency.BTC,
};

export const MAX_AMOUNT_BY_NETWORK = {
	[NetworkType.MAINNET]: 100,
	[NetworkType.TESTNET]: 1000,
};

export const CURRENCY_DECIMAL_PRECISION = {
	[Currency.BTC]: 8,
};
