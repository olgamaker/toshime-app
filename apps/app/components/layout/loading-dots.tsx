function LoadingDots() {
	return (
		<output className="inline-flex items-center gap-1" aria-label="Loading">
			<div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0ms]"></div>
			<div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:150ms]"></div>
			<div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:300ms]"></div>
		</output>
	);
}

export { LoadingDots };
