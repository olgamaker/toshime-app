export function getBaseUrl() {
	if (typeof window !== "undefined") {
		// Client-side - use relative path
		return "";
	}

	// Use environment variable if set
	if (process.env.NEXT_PUBLIC_BASE_URL) {
		return process.env.NEXT_PUBLIC_BASE_URL;
	}

	// Fall back to localhost for local dev
	return "http://localhost:3000";
}
