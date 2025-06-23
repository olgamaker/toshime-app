import type { NetworkType } from "@repo/lib/config/network";
import { NetworkBadge } from "./network";

function WalletPill({
	address,
	networkType,
}: {
	address: string;
	networkType: NetworkType;
}) {
	return (
		<div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
			<NetworkBadge networkType={networkType} />
			<span>{address}</span>
		</div>
	);
}
export { WalletPill };
