import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

interface ToggleProps {
	isDark?: boolean;
	onThemeChange: (theme: string) => void;
}

function ThemeToggle({ isDark, onThemeChange }: ToggleProps) {
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => onThemeChange(isDark ? "light" : "dark")}
			aria-label="Toggle theme"
		>
			{isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
		</Button>
	);
}

export { ThemeToggle };
