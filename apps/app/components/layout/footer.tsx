import { ThemeSwitch } from "./theme-switch";

function Footer() {
	return (
		<footer className="w-full border-t py-4 px-6 text-sm text-muted-foreground">
			<div className="max-w-6xl mx-auto flex items-center justify-between">
				<span>&copy; {new Date().getFullYear()}</span>
				<ThemeSwitch />
			</div>
		</footer>
	);
}

export { Footer };
