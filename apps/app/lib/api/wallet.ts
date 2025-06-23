import type { WalletResponse } from "@repo/lib/types/wallet";
import { getBaseUrl } from "./base-url";

export async function fetchWallet(): Promise<WalletResponse | null> {
	try {
		// !! Cache the response for the demo purpose
		const res = await fetch(`${getBaseUrl()}/api/wallet`, {
			cache: "force-cache",
		});

		if (!res.ok) {
			return null;
		}

		const data = await res.json();
		if (!data || !data.address) {
			console.error("Failed to fetch wallet:", data);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Failed to fetch wallet:", error);
		return null;
	}
}
