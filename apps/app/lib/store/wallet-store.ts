import type { WalletResponse } from "@repo/lib/types/wallet";
import { create } from "zustand";

interface WalletState {
	wallet: WalletResponse | null;
	setWallet: (wallet: WalletResponse) => void;
	reset: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
	wallet: null,
	setWallet: (wallet) => set({ wallet }),
	reset: () => set({ wallet: null }),
}));
