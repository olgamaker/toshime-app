"use client";

import { DEFAULT_NETWORK_CURRENCY } from "@repo/lib/config/currency";
import { formatCurrency } from "@repo/lib/formats/amount";
import type { WalletResponse } from "@repo/lib/types/wallet";
import { AddressPill } from "@repo/ui/crypto/address";
import { BalancePill } from "@repo/ui/crypto/balance";
import { NetworkBadge } from "@repo/ui/crypto/network";
import { useEffect } from "react";
import { useBalanceStore } from "@/lib/store/balance-store";
import { useWalletStore } from "@/lib/store/wallet-store";
import { LoadingDots } from "../layout/loading-dots";

function WalletInfo() {
	const { wallet } = useWalletStore();
	const { balance, startBalanceListener, stopBalanceListener } =
		useBalanceStore();

	useEffect(() => {
		if (!wallet) return;
		startBalanceListener({
			address: wallet.address,
			currency: DEFAULT_NETWORK_CURRENCY[wallet.networkType],
			networkType: wallet.networkType,
		});
		return () => stopBalanceListener();
	}, [wallet]);

	if (!wallet) {
		return <LoadingDots />;
	}

	return (
		<section className="flex items-center gap-4 h-full">
			<NetworkBadge networkType={wallet.networkType} />

			<AddressPill
				address={wallet.address}
				currency={DEFAULT_NETWORK_CURRENCY[wallet.networkType]}
			/>

			{balance !== null ? (
				<BalancePill
					balance={formatCurrency(balance, { trim: true })}
					currency={DEFAULT_NETWORK_CURRENCY[wallet.networkType]}
				/>
			) : (
				<LoadingDots />
			)}
		</section>
	);
}

function WalletUpdater() {
	const { setWallet } = useWalletStore();

	useEffect(() => {
		fetchWallet()
			.then((wallet) => {
				if (!wallet) {
					return window.location.assign("/");
				}

				setWallet(wallet);
			})
			.catch(() => window.location.assign("/"));
	}, [setWallet]);

	return null;
}

async function fetchWallet(): Promise<WalletResponse | null> {
	try {
		const res = await fetch("/api/wallet", {
			method: "GET",
			credentials: "include",
		});

		if (!res.ok) return null;

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

export { WalletInfo, WalletUpdater };
