import type { UserSession } from "@repo/lib/types/user-session";
import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
	process.env.SESSION_SECRET || "dev-session-secret-32-chars-min",
);

export const COOKIE_NAME = "wallet-session";

export async function setSessionCookie(session: UserSession) {
	const token = await new SignJWT(session as unknown as JWTPayload)
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("2h")
		.sign(secret);

	const cookieStore = await cookies();
	cookieStore.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 2, // 2 hours in seconds
	});
}

export async function getSessionCookie(): Promise<UserSession | null> {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get(COOKIE_NAME)?.value;

		if (!token) {
			console.log("No session token found");
			return null;
		}

		const { payload } = await jwtVerify(token, secret);
		return payload as unknown as UserSession;
	} catch (error) {
		console.error("Error verifying session token:", error);
		return null;
	}
}

export const runtime = "nodejs";
