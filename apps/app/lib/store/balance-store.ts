import type { Currency } from "@repo/lib/config/currency";
import type { NetworkType } from "@repo/lib/config/network";
import { create } from "zustand";
import { useUsedAddressesStore } from "@/lib/store/used-addresses-store";

interface ListenerKey {
	address: string;
	currency: Currency;
	networkType: NetworkType;
}

type Status = "idle" | "listening" | "error";

interface BalanceState {
	// Tracked wallet information
	current: ListenerKey | null;
	// Confirmed balance
	balance: number | null;
	// Polling status.
	status: Status;
	// Polling function handle
	poller: NodeJS.Timeout | null;
	// Start polling for a wallet's balance
	startBalanceListener: (key: ListenerKey) => void;
	// Stop any active polling
	stopBalanceListener: () => void;
}

/**
 * Fetch the confirmed balance for the wallet address plus any used addresses.
 */
async function fetchConsolidatedBalance(
	address: string,
	used: string[],
	networkType: NetworkType,
): Promise<number> {
	const res = await fetch("/api/balance", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ address, usedAddresses: used, networkType }),
	});

	if (!res.ok) {
		throw new Error("Failed to fetch consolidated balance");
	}

	const data = await res.json();
	return data.balance ?? 0;
}

export const useBalanceStore = create<BalanceState>((set, get) => ({
	current: null,
	balance: null,
	status: "idle",
	poller: null,

	startBalanceListener: (key) => {
		get().stopBalanceListener();
		set({ current: key, balance: null, status: "listening" });

		const poll = async () => {
			try {
				const { usedAddresses } = useUsedAddressesStore.getState();
				const additional = usedAddresses.map((a) => a.address);
				const consolidated = await fetchConsolidatedBalance(
					key.address,
					additional,
					key.networkType,
				);

				set({ balance: consolidated, status: "listening" });
			} catch (err) {
				console.error("Polling error:", err);
				set({ status: "error" });
			}
		};

		poll();
		const interval = setInterval(poll, 10000); // Poll every 10s
		set({ poller: interval });
	},

	stopBalanceListener: () => {
		const { poller } = get();
		if (poller) clearInterval(poller);
		set({ current: null, balance: null, status: "idle", poller: null });
	},
}));
