"use client";

import { buttonVariants } from "@repo/ui/base/button";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export default function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center text-center px-4 min-h-[calc(100vh-72px)]">
			<div className="visually-hidden my-6 md:my-12">
				<Logo className="h-10 md:h-20 text-black/90 dark:text-white" />
			</div>
			<h1 className="text-3xl font-semibold mb-4">Page Not Found</h1>

			<Link href="/" className={buttonVariants()}>
				Back to Home
			</Link>
		</div>
	);
}
