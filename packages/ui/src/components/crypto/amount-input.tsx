import {
	CURRENCY_DECIMAL_PRECISION,
	type Currency,
} from "@repo/lib/config/currency";
import { cn } from "@repo/ui/lib/utils";
import type React from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Input } from "../base/input";
import { Label } from "../base/label";

interface CryptoAmountProps {
	id: string;
	label?: string;
	value: string;
	currency: Currency;
	placeholder?: string;
	error?: string;
	disabled?: boolean;
	maxDecimals?: number;
	onChange: (value: string) => void;
	onBlur?: () => void;
}

const CryptoAmount = forwardRef<HTMLInputElement, CryptoAmountProps>(
	(
		{
			value,
			error,
			disabled,
			placeholder = "0.00",
			label = "Amount",
			id,
			currency,
			onChange,
			maxDecimals,
			onBlur,
		},
		ref,
	) => {
		const errorId = `${id}-error`;

		const decimalPrecision = useMemo(() => {
			return maxDecimals ?? CURRENCY_DECIMAL_PRECISION[currency] ?? 8;
		}, [currency, maxDecimals]);

		const inputPattern = useMemo(() => {
			return `^[0-9]*[.]?[0-9]{0,${decimalPrecision}}$`;
		}, [decimalPrecision]);

		const formatAmount = useCallback(
			(inputValue: string): string => {
				let cleaned = inputValue.replace(/[^0-9.]/g, "");
				const parts = cleaned.split(".");
				if (parts.length > 2) {
					cleaned = `${parts[0]}.${parts.slice(1).join("")}`;
				}

				const [intPart, decPart] = cleaned.split(".");
				let result = intPart?.replace(/^0+(?!\.)/, "") || "0";

				if (decPart !== undefined) {
					result += `.${decPart.slice(0, decimalPrecision)}`;
				}

				return result === "" || result === "." ? "0" : result;
			},
			[decimalPrecision],
		);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const formatted = formatAmount(e.target.value);
			onChange(formatted);
		};

		const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
			const pastedData = e.clipboardData.getData("text");
			const formatted = formatAmount(pastedData);
			onChange(formatted);
			e.preventDefault();
		};

		const handleBlur = () => {
			let cleanedValue = value;

			if (cleanedValue.endsWith(".")) {
				cleanedValue = cleanedValue.slice(0, -1);
			}

			if (cleanedValue === "" || cleanedValue === ".") {
				cleanedValue = "0";
			}

			onChange(cleanedValue);
			onBlur?.();
		};

		return (
			<div className="space-y-2">
				{label && <Label htmlFor={id}>{label}</Label>}
				<div className="relative">
					<Input
						ref={ref}
						type="text"
						id={id}
						name={id}
						value={value}
						placeholder={placeholder}
						disabled={disabled}
						autoComplete="off"
						inputMode="decimal"
						pattern={inputPattern}
						title={`Enter a number with up to ${decimalPrecision} decimal places`}
						aria-invalid={!!error}
						aria-describedby={error ? errorId : undefined}
						className={cn(
							"h-12 pr-16",
							error && "border-red-500 focus-visible:ring-red-500",
						)}
						onChange={handleChange}
						onBlur={handleBlur}
						onPaste={handlePaste}
					/>
					<span
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none"
						aria-hidden="true"
					>
						{currency}
					</span>
				</div>
				{error && (
					<p id={errorId} className="text-sm text-red-600">
						{error}
					</p>
				)}
			</div>
		);
	},
);

CryptoAmount.displayName = "CryptoAmount";

export { CryptoAmount };
