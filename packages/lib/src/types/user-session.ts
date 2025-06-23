import type { WalletResponse } from "./wallet";

export interface UserSession {
	wallet: { xpub: string; publicWallet: WalletResponse };
}
