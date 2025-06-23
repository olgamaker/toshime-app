"use client";

import { NetworkType } from "@repo/lib/config/network";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@repo/ui/base/alert";
import { useNetworkStore } from "@/lib/store/network-store";

function NetworkChecker() {
	const { networkType } = useNetworkStore();

	// Disaplay a site-through warning for non-Mainnet networks
	if (networkType !== NetworkType.MAINNET) {
		return (
			<Alert className="bg-orange-100 text-orange-900 border-orange-300 my-4 md:my-6">
				<div className="flex items-start gap-3">
					<AlertIcon variant="destructive" />
					<div>
						<AlertTitle>Testnet Wallet Notice</AlertTitle>
						<AlertDescription>
							This wallet operates on a test network. Any BTC sent or received
							here has no real value.
						</AlertDescription>
					</div>
				</div>
			</Alert>
		);
	}

	return null;
}

export { NetworkChecker };
