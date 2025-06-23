import { NetworkType } from "@repo/lib/config/network";

function NetworkBadge({ networkType }: { networkType: NetworkType }) {
	return (
		<legend className="flex gap-1">
			<BTCIcon className="text-orange-500 h-6 w-6" />
			<span id="network-label" className="sr-only">
				{networkType}
			</span>
			{networkType !== NetworkType.MAINNET && (
				<span
					role="note"
					className="ext-xs font-medium bg-orange-100 text-orange-800 rounded-full border border-orange-200 inline-flex items-center px-1.5 py-[1px] -mt-1"
					aria-label={`You're on ${networkType} Network`}
				>
					{networkType.toUpperCase()}
				</span>
			)}
		</legend>
	);
}

function BTCIcon({ className = "h-6 w-6" }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z" />
			<path
				fill="#fff"
				d="M17.396 10.22c.208-1.424-.86-2.19-2.32-2.7l.474-1.9-1.157-.29-.462 1.85c-.305-.076-.618-.147-.93-.22l.465-1.86-1.158-.288-.474 1.9c-.252-.057-.498-.114-.738-.175l0-.008-1.596-.398-.308 1.235s.86.198.842.21c.469.117.554.427.54.673l-.54 2.165c.032.008.074.02.12.038l-.12-.03-.756 3.03c-.057.14-.202.35-.53.27.012.017-.842-.21-.842-.21l-.576 1.32 1.508.377c.28.07.555.143.825.212l-.48 1.924 1.157.288.474-1.9c.312.085.615.162.91.235l-.473 1.89 1.158.288.48-1.92c1.98.375 3.47.223 4.1-1.563.51-1.44-.025-2.27-1.065-2.81.758-.174 1.33-.67 1.48-1.696zm-2.64 3.7c-.36 1.44-2.79.66-3.58.465l.64-2.56c.79.196 3.32.585 2.94 2.095zm.36-3.72c-.33 1.31-2.37.645-3.03.48l.58-2.32c.66.165 2.79.47 2.45 1.84z"
			/>
		</svg>
	);
}

export { NetworkBadge, BTCIcon };
