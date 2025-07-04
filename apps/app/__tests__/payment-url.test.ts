import { NetworkType } from "@repo/lib/config/network";
import { describe, expect, it } from "vitest";
import { getNetworkPaymentUrl } from "../lib/payments/url";

describe("getNetworkPaymentUrl", () => {
	it("generates bitcoin url", () => {
		expect(getNetworkPaymentUrl("addr", 1, NetworkType.MAINNET)).toBe(
			"bitcoin:addr?amount=1",
		);
	});

	it("throws on invalid network", () => {
		expect(() =>
			getNetworkPaymentUrl("addr", 1, "invalid" as unknown as NetworkType),
		).toThrow();
	});
});
