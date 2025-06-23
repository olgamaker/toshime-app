import { afterEach, describe, expect, it } from "vitest";
import { getBaseUrl } from "../lib/api/base-url";

describe("getBaseUrl", () => {
	const originalWindow = globalThis.window;

	afterEach(() => {
		// Restore original window after each test
		globalThis.window = originalWindow;
		delete process.env.NEXT_PUBLIC_BASE_URL;
	});

	it("returns env value on server", () => {
		// Simulate server by deleting window
		delete (globalThis as { window?: Window }).window;

		process.env.NEXT_PUBLIC_BASE_URL = "http://example.com";
		expect(getBaseUrl()).toBe("http://example.com");
	});

	it("returns empty string in browser", () => {
		// Simulate client
		globalThis.window = {} as Window & typeof globalThis;

		expect(getBaseUrl()).toBe("");
	});
});
