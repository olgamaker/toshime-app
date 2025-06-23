import { Buffer } from "node:buffer";
import { hmac } from "@noble/hashes/hmac";
import { sha512 } from "@noble/hashes/sha512";
import * as nobleSecp from "@noble/secp256k1";

export const ecc = {
	isPoint(p: Buffer): boolean {
		try {
			nobleSecp.Point.fromHex(p);
			return true;
		} catch {
			return false;
		}
	},
	isPrivate(d: Buffer): boolean {
		return nobleSecp.utils.isValidPrivateKey(d);
	},
	pointFromScalar(d: Buffer, compressed = true): Buffer | null {
		try {
			return Buffer.from(nobleSecp.getPublicKey(d, compressed));
		} catch {
			return null;
		}
	},
	privateAdd(d: Buffer, tweak: Buffer): Buffer | null {
		try {
			const sum =
				(BigInt(`0x${d.toString("hex")}`) +
					BigInt(`0x${tweak.toString("hex")}`)) %
				nobleSecp.CURVE.n;
			if (sum === 0n) return null;
			return Buffer.from(sum.toString(16).padStart(64, "0"), "hex");
		} catch {
			return null;
		}
	},
	utils: {
		...nobleSecp.utils,
		hmacSha512Sync(key: Uint8Array, data: Uint8Array): Uint8Array {
			return hmac(sha512, key, data);
		},
	},
};
