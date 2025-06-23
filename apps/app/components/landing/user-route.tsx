"use client";

import { redirect } from "next/navigation";
import { useWalletStore } from "@/lib/store/wallet-store";
import { LandingNewFlow } from "./new-flow";

function LandingUserRoute() {
	const { wallet } = useWalletStore();

	if (wallet) {
		redirect("/receive");
	}

	return <LandingNewFlow />;
}
export { LandingUserRoute };
