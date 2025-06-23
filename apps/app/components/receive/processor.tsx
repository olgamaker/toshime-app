"use client";

import { Button } from "@repo/ui/base/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/base/dialog";
import { ReadableAddress } from "@repo/ui/crypto/address";
import { QRCode } from "@repo/ui/crypto/qrcode";
import { useEffect, useMemo } from "react";
import { getNetworkPaymentUrl } from "@/lib/payments/url";
import { useRequestStore } from "@/lib/store/request-store";

function ReceiveProcessor() {
	const { request, status, resetPaymentListener } = useRequestStore();

	useEffect(() => {
		if (status === "confirmed") {
			const t = setTimeout(() => {
				resetPaymentListener();
			}, 2000);
			return () => clearTimeout(t);
		}
	}, [status, resetPaymentListener]);

	const paymentUri = useMemo(() => {
		if (!request) return "";

		try {
			return getNetworkPaymentUrl(
				request.address,
				request.amount,
				request.networkType,
			);
		} catch {
			return `bitcoin:${request.address}?amount=${request.amount}`;
		}
	}, [request]);

	const onShare = () => {
		const subject = encodeURIComponent("My wallet address");
		const body = encodeURIComponent(`Here is my payment url:\n\n${paymentUri}`);
		window.open(`mailto:?subject=${subject}&body=${body}`);
	};

	if (!request) {
		return (
			<p className="text-red-600">Invalid receive request. Please try again.</p>
		);
	}

	return (
		<Dialog open onOpenChange={resetPaymentListener}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Receive</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 text-center">
					{status !== "confirmed" && (
						<>
							<QRCode value={paymentUri} />

							<ReadableAddress address={request.address} />
							<Button
								onClick={onShare}
								className="w-full bg-blue-500 hover:bg-blue-600 text-white"
							>
								Share
							</Button>
						</>
					)}
					{status === "pending" && (
						<p className="text-muted-foreground">
							Waiting for payment of {request.amount} {request.currency}
						</p>
					)}
					{status === "confirmed" && (
						<p className="font-semibold text-green-600">
							Payment of {request.amount} {request.currency} received!
						</p>
					)}
					{status === "error" && (
						<p className="text-red-600">
							Payment tracking failed. Please verify payment manually.
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export { ReceiveProcessor };
