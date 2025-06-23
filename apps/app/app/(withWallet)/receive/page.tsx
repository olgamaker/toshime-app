import type { Metadata } from "next";
import { ReceiveForm } from "@/components/receive/form";

export const metadata: Metadata = {
	title: "ToshiMe - Receive Funds",
	description: "Showcase receiving BTC payments with ToshiMe",
};

export default function ReceivePage() {
	return (
		<div className="py-4">
			<h1 className="text-xl md:text-2xl font-semibold mb-2 md:mb-6">
				Receive <span className="font-thin inline-block pl-1">↑</span>
			</h1>
			<p className="text-sm text-muted-foreground mb-6 md:mb-8">
				To request a payment, enter the amount you'd like to receive.
			</p>

			<ReceiveForm />
		</div>
	);
}
