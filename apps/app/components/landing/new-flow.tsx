"use client";

import { buttonVariants } from "@repo/ui/base/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IntroBackground } from "../background/intro";
import { Logo } from "../layout/logo";

function LandingNewFlow() {
	const [mounted, setMounted] = useState(false);
	const [logoAnimated, setLogoAnimated] = useState(false);

	useEffect(() => {
		setMounted(true);
		const timer = setTimeout(() => {
			setLogoAnimated(true);
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	if (!mounted) return null;

	return (
		<div className="relative w-full h-full overflow-hidden">
			<IntroBackground />

			{/* Main Content */}
			<div className="relative z-10 flex flex-col items-center justify-center px-4 text-center min-h-[calc(100vh-72px)]">
				{/* Logo */}
				<div className="mb-8">
					<div
						className={`transition-all duration-2000 ease-out ${
							logoAnimated
								? "opacity-100 scale-100 translate-y-0"
								: "opacity-0 scale-150 translate-y-10"
						}`}
					>
						<h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground mb-4 drop-shadow-sm">
							<Logo className="w-full" />
							<span className="sr-only">Toshime</span>
						</h1>
					</div>
				</div>

				{/* Welcome Text */}

				<section
					className={`transition-all duration-1000 delay-500 ease-out ${
						logoAnimated
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
						Welcome to ToshiMe
					</h2>
				</section>

				{/* Description */}
				<section
					className={`transition-all duration-1000 delay-700 ease-out ${
						logoAnimated
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<p className="md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed backdrop-blur-sm">
						Create crypto payment requests instantly with your new wallet.
						Experience the future of digital transactions with seamless, secure,
						and lightning-fast payments.
					</p>

					{/* CTA Button */}
					<div
						className={`transition-all duration-1000 delay-1000 ease-out ${
							logoAnimated
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<Link href="receive" className={buttonVariants({ size: "lg" })}>
							Start receiving crypto
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
}

export { LandingNewFlow };
