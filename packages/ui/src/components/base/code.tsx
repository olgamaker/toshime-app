import type { JSX } from "react";

function Code({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}): JSX.Element {
	return <code className={className}>{children}</code>;
}

export { Code };
