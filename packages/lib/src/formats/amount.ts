export function formatCurrency(
	value: number,
	options?: { trim?: boolean },
): string {
	const full = value.toFixed(8);
	return options?.trim ? `${parseFloat(full)}` : `${full}`;
}
