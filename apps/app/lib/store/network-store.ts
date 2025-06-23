import { NetworkType } from "@repo/lib/config/network";
import { create } from "zustand";

interface NetworkState {
	networkType: NetworkType;
	setNetworkType: (networkType: NetworkType) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
	networkType: NetworkType.TESTNET,
	setNetworkType: (networkType) => set({ networkType }),
}));
