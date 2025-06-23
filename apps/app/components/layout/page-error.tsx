"use client";

import { Button } from "@repo/ui/base/button";

function PageError({ message }: { message: string }) {
	return (
		<section className="p-4">
			<h1 className="text-xl font-semibold mb-2">{message}</h1>
			<Button onClick={() => window.location.reload()}>Refresh Page</Button>
		</section>
	);
}

export { PageError };
