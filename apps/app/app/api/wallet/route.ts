import { NetworkType } from "@repo/lib/config/network";
import { generateWallet } from "@repo/wallet/create";
import { generateXpub, preparePublicWallet } from "@repo/wallet/manage";
import { type JWTPayload, SignJWT } from "jose";
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/routes/session-cookie";

export async function GET(req: Request) {
	const secret = new TextEncoder().encode(
		process.env.SESSION_SECRET || "dev-session-secret-32-chars-min",
	);

	const { searchParams } = new URL(req.url);
	const network =
		(searchParams.get("network") as NetworkType) || NetworkType.TESTNET;

	const wallet = await generateWallet(network);
	const publicWallet = preparePublicWallet(wallet, network);
	const xpub = generateXpub(wallet, network);

	const session = { wallet: { xpub, publicWallet } };

	const token = await new SignJWT(session as unknown as JWTPayload)
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("2h")
		.sign(secret);

	const res = NextResponse.json(publicWallet);
	res.cookies.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax", // recommended
		path: "/",
		maxAge: 60 * 60 * 2,
	});

	return res;
}
