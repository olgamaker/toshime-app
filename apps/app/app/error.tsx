"use client";

import { Button } from "@repo/ui/base/button";
import { Logo } from "@/components/layout/logo";

export default function ErrorPage({ reset }: { reset: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center text-center px-4 min-h-[calc(100vh-72px)]">
			<div className="visually-hidden my-6 md:my-12">
				<Logo className="h-10 md:h-20 text-black/90 dark:text-white" />
			</div>
			<h1 className="text-3xl font-semibold text-red-600 mb-2">
				Something went wrong
			</h1>
			<p className="text-muted-foreground text-sm mb-6">
				Hang tight - we're fixing the issue.
			</p>
			<Button
				onClick={reset}
				className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
			>
				Refresh page
			</Button>
		</div>
	);
}
