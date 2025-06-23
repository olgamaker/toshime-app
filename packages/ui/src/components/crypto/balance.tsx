import type { Currency } from "@repo/lib/config/currency";

function BalancePill({
	balance,
	currency,
}: {
	balance: string;
	currency: Currency;
}) {
	return (
		<div className="text-right">
			<span id="balance-label" className="sr-only">
				{currency} Balance
			</span>
			<div className="text-lg">
				<span className="font-semibold">{balance}</span> {currency}
			</div>
		</div>
	);
}

export { BalancePill };
