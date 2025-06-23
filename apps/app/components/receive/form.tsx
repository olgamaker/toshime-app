"use client";

import {
	Currency,
	DEFAULT_NETWORK_CURRENCY,
	MAX_AMOUNT_BY_NETWORK,
} from "@repo/lib/config/currency";
import type { NetworkType } from "@repo/lib/config/network";
import { Alert, AlertDescription, AlertIcon } from "@repo/ui/base/alert";
import { CryptoAmount } from "@repo/ui/crypto/amount-input";
import { RequestButton } from "@repo/ui/crypto/request-button";
import { useState } from "react";
import { z } from "zod";
import { useBalanceStore } from "@/lib/store/balance-store";
import { useRequestStore } from "@/lib/store/request-store";
import { useUsedAddressesStore } from "@/lib/store/used-addresses-store";
import { useWalletStore } from "@/lib/store/wallet-store";
import { ReceiveDisclaimer } from "./disclaimer";
import { ReceiveProcessor } from "./processor";

const amountSchema = (networkType: NetworkType, currency: Currency) =>
	z
		.string()
		.trim()
		.nonempty({ message: "Amount is required" })
		.refine((val) => !Number.isNaN(Number(val)), {
			message: "Amount must be a valid number",
		})
		.transform((val) => Number(val))
		.refine((val) => val > 0, { message: "Amount must be greater than 0" })
		.refine((val) => val <= MAX_AMOUNT_BY_NETWORK[networkType], {
			message: `Amount cannot be greater than ${MAX_AMOUNT_BY_NETWORK[networkType]} ${currency}`,
		});

function ReceiveForm() {
	const { wallet } = useWalletStore();
	const { usedAddresses, addUsedAddress } = useUsedAddressesStore();
	const { request, startPaymentListener } = useRequestStore();
	const { startBalanceListener } = useBalanceStore();

	const [amount, setAmount] = useState("");
	const [inputError, setInputError] = useState("");
	const [touched, setTouched] = useState(false);
	const [networkError, setNetworkError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const currency = wallet
		? DEFAULT_NETWORK_CURRENCY[wallet.networkType as NetworkType]
		: Currency.BTC;

	const validateAmountInput = (value: string): string => {
		if (!wallet) return "";
		const result = amountSchema(wallet.networkType, currency).safeParse(value);
		if (!result.success) {
			return result.error.errors[0]?.message ?? "Invalid amount";
		}
		return "";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!wallet) {
			setNetworkError("Wallet not initialised.");
			return;
		}

		setTouched(true);
		const validationError = validateAmountInput(amount);
		setInputError(validationError);
		if (validationError) return;

		setIsSubmitting(true);
		setNetworkError("");

		try {
			const response = await fetch("/api/generate-address", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					usedAddresses,
					networkType: wallet.networkType,
					addressType: wallet.addressType,
				}),
				credentials: "include",
			});

			if (!response.ok) throw new Error("Failed to generate address");

			const data = await response.json();
			if (data.error) throw new Error(data.error);

			addUsedAddress(
				data.address,
				data.index,
				wallet.networkType,
				wallet.addressType,
			);

			const paymentRequest = {
				amount: Number(amount),
				address: data.address,
				networkType: wallet.networkType,
				currency,
			};

			startPaymentListener(paymentRequest);
			startBalanceListener({
				address: data.address,
				currency,
				networkType: wallet.networkType,
			});

			setAmount("");
			setInputError("");
			setTouched(false);
			setNetworkError("");
		} catch (err) {
			setNetworkError((err as Error).message || "An unexpected error occurred");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!wallet) {
		return null;
	}

	return (
		<>
			{request && <ReceiveProcessor />}
			<div className="rounded-lg border bg-background p-6 shadow-sm space-y-4">
				<form onSubmit={handleSubmit} className="grid w-full gap-4 md:gap-8">
					<div className="grid gap-2">
						<CryptoAmount
							id="amount"
							currency={currency}
							label="Amount (BTC)"
							value={amount}
							error={touched ? inputError : undefined}
							onChange={(val) => {
								setAmount(val);
								setNetworkError("");
							}}
							onBlur={() => {
								setTouched(true);
								setInputError(validateAmountInput(amount));
							}}
						/>
					</div>

					<RequestButton />

					{isSubmitting && (
						<p className="text-muted-foreground pt-4">Generating address...</p>
					)}
				</form>
			</div>

			<div className="mt-4">
				{networkError && (
					<Alert variant="destructive">
						<div className="flex items-start gap-3">
							<AlertIcon variant="destructive" />
							<div>
								<AlertDescription>
									Something went wrong. Please try agin.
								</AlertDescription>
							</div>
						</div>
					</Alert>
				)}
				<ReceiveDisclaimer />
			</div>
		</>
	);
}

export { ReceiveForm };
