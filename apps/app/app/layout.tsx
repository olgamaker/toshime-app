import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@repo/ui/globals.css";
import "./globals.css";
import { cn } from "@repo/ui/lib/utils";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/layout/footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ToshiMe App",
	description: "Simple app to showcase BTC payments",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={cn(geist.className, "min-h-screen flex flex-col")}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
