import type { Currency } from "@repo/lib/config/currency";
import type { NetworkType } from "@repo/lib/config/network";
import { create } from "zustand";

interface PaymentRequest {
	amount: number;
	address: string;
	networkType: NetworkType;
	currency: Currency;
}

type RequestStatus = "idle" | "pending" | "confirmed" | "error";
interface RequestState {
	// Current request being tracked
	request: PaymentRequest | null;
	// Status of the request funding
	status: RequestStatus;
	// Flag set once the request funded
	hasReceived: boolean;
	// Polling handler
	poller: NodeJS.Timeout | null;
	// Start polling the server for updates
	startPaymentListener: (req: PaymentRequest) => void;
	// Stop any active polling
	resetPaymentListener: () => void;
}

/**
 * Query the backend to see if the specified payment has been received.
 */
async function checkIfReceived(
	address: string,
	networkType: NetworkType,
	startTime: string,
	amount: number,
): Promise<boolean> {
	const params = new URLSearchParams({
		address,
		networkType,
		startTime,
		amount: amount.toString(),
	});

	const res = await fetch(`/api/payment-received?${params.toString()}`);
	const data = await res.json();
	return data.received === true;
}

export const useRequestStore = create<RequestState>((set, get) => ({
	request: null,
	status: "idle",
	hasReceived: false,
	poller: null,

	startPaymentListener: (req) => {
		get().resetPaymentListener();

		const startTime = new Date().toISOString();
		set({ request: req, status: "pending", hasReceived: false });

		const poll = async () => {
			try {
				const received = await checkIfReceived(
					req.address,
					req.networkType,
					startTime,
					req.amount,
				);
				if (received) {
					set({ hasReceived: true, status: "confirmed" });
					get().resetPaymentListener();
				}
			} catch (err) {
				console.error("Polling error:", err);
				set({ status: "error" });
			}
		};

		poll();
		const interval = setInterval(poll, 10000); // Poll every 10s
		set({ poller: interval });
	},

	resetPaymentListener: () => {
		const { poller } = get();
		if (poller) clearInterval(poller);
		set({ request: null, status: "idle", hasReceived: false, poller: null });
	},
}));
