import { Header as BaseHeader } from "@repo/ui/base/header";
import Link from "next/link";
import { WalletInfo } from "../wallet/wallet";
import { Logo } from "./logo";

function Header() {
	return (
		<BaseHeader
			logo={
				<Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
					<Logo className="h-5 text-black/90 dark:text-white" />
					<span className="sr-only">ToshiMe App</span>
				</Link>
			}
		>
			<WalletInfo />
		</BaseHeader>
	);
}

export { Header };
