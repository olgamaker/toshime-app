import { Header } from "@/components/layout/header";
import { NetworkChecker } from "@/components/layout/network-checker";
import { WalletUpdater } from "@/components/wallet/wallet";

// SSR Wallet fetching
export default async function WithWalletLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<WalletUpdater />
			<Header />

			<main className="flex-1 max-w-3xl mx-auto w-full px-4">
				<NetworkChecker />
				{children}
			</main>
		</>
	);
}
