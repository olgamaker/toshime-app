"use client";

import { ThemeToggle } from "@repo/ui/base/theme-toggle";
import { useTheme } from "next-themes";
import { useCallback } from "react";

function ThemeSwitch() {
	const { theme, setTheme } = useTheme();

	const handleThemeChange = useCallback(
		(newTheme: string) => {
			setTheme(newTheme);
		},
		[setTheme],
	);

	return (
		<ThemeToggle isDark={theme === "dark"} onThemeChange={handleThemeChange} />
	);
}

export { ThemeSwitch };
