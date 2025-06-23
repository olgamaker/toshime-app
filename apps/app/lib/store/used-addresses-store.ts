import type { NetworkType } from "@repo/lib/config/network";
import type { AddressType, IndexedAddress } from "@repo/lib/types/wallet";
import { create } from "zustand";

interface UsedAddressesState {
	// List of known addresses
	usedAddresses: IndexedAddress[];
	// Track a newly generated address
	addUsedAddress: (
		address: string,
		index: number,
		networkType: NetworkType,
		addressType: AddressType,
	) => void;
	// Mark an address as already used
	markAddressUsed: (index: number) => void;
	// Clear the store.
	reset: () => void;
}

export const useUsedAddressesStore = create<UsedAddressesState>((set) => ({
	usedAddresses: [],
	addUsedAddress: (address, index, networkType, addressType) =>
		set((state) => ({
			usedAddresses: [
				...state.usedAddresses,
				{ index, address, networkType, addressType, used: false },
			],
		})),
	markAddressUsed: (index) =>
		set((state) => ({
			usedAddresses: state.usedAddresses.map((addr) =>
				addr.index === index ? { ...addr, used: true } : addr,
			),
		})),
	reset: () => set({ usedAddresses: [] }),
}));
