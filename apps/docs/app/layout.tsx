import "@repo/ui/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ToshiApp Documentation",
	description: "Guides for running the ToshiApp",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-background text-foreground">
				{children}
			</body>
		</html>
	);
}
