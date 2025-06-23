import { Header } from "@/components/layout/header";
import { NetworkChecker } from "@/components/layout/network-checker";
import { WalletUpdater } from "@/components/wallet/wallet";
import { fetchWallet } from "@/lib/api/wallet";

// SSR Wallet fetching
export default async function WithWalletLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const wallet = await fetchWallet();
	if (!wallet) {
		throw new Error("Wallet not found");
	}

	return (
		<>
			<WalletUpdater wallet={wallet} />
			<Header />

			<main className="flex-1 max-w-3xl mx-auto w-full px-4">
				<NetworkChecker />
				{children}
			</main>
		</>
	);
}
