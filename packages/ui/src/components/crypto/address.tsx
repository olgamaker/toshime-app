"use client";

import type { Currency } from "@repo/lib/config/currency";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../base/button";

function AddressPill({
	address,
	currency,
}: {
	address: string;
	currency: Currency;
}) {
	const [copied, setCopied] = useState(false);

	const truncateAddress = (addr: string) => {
		if (addr.length <= 16) return addr;
		return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(address);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<span className="sr-only">{currency} Address</span>
			</div>
			<div className="flex items-center gap-1">
				<code
					className="text-sm font-mono bg-muted px-2  rounded truncate"
					title={address}
				>
					{truncateAddress(address)}
				</code>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 shrink-0"
					onClick={copyToClipboard}
					aria-label="Copy your wallet address to clipboard"
					aria-describedby="copy-status"
				>
					{copied ? (
						<Check className="h-4 w-4 text-green-600" />
					) : (
						<Copy className="h-4 w-4" />
					)}
				</Button>
				<span id="copy-status" className="sr-only" aria-live="polite">
					{copied ? "Address copied to clipboard" : ""}
				</span>
			</div>
		</div>
	);
}

function ReadableAddress({ address }: { address: string }) {
	const segments = address.match(/.{1,4}/g) ?? [];

	return (
		<div className="flex flex-wrap justify-center items-center gap-2 font-mono text-sm text-primary text-center">
			{segments.map((seg, idx) => (
				<span key={`${seg}-${idx.toString()}`} className="tracking-wide">
					{seg}
				</span>
			))}
		</div>
	);
}

export { AddressPill, ReadableAddress };
