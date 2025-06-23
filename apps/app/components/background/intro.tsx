function IntroBackground() {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
			{/* Grid pattern  */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

			{/* Floating elements  */}
			<div className="absolute top-20 left-[10%] w-32 h-32 border border-blue-200/30 dark:border-blue-800/30 rounded-2xl backdrop-blur-sm animate-float-slow rotate-12 bg-gradient-to-br from-white/5 to-blue-100/10 dark:from-slate-800/20 dark:to-blue-900/10" />

			<div
				className="absolute top-32 right-[15%] w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-sm animate-bounce"
				style={{ animationDuration: "3s" }}
			/>

			<div
				className="absolute bottom-32 left-[20%] w-24 h-24 border-2 border-emerald-300/20 dark:border-emerald-700/20 rounded-full animate-spin-slow bg-gradient-to-r from-emerald-100/10 to-cyan-100/10 dark:from-emerald-900/10 dark:to-cyan-900/10"
				style={{ animationDuration: "25s" }}
			/>

			<div className="absolute bottom-40 right-[25%] w-28 h-28 bg-gradient-to-br from-orange-300/15 to-red-400/15 rotate-45 rounded-xl animate-float-fast backdrop-blur-sm" />

			<div
				className="absolute top-1/2 left-[5%] w-16 h-16 bg-gradient-to-br from-cyan-400/25 to-blue-500/25 rounded-lg animate-pulse rotate-45"
				style={{ animationDuration: "2s" }}
			/>

			<div
				className="absolute top-[60%] right-[8%] w-12 h-12 border border-violet-300/30 dark:border-violet-700/30 rounded-full animate-ping"
				style={{ animationDuration: "4s" }}
			/>
		</div>
	);
}
export { IntroBackground };
