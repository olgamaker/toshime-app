interface HeaderProps {
	logo: React.ReactNode;
	children: React.ReactNode;
}

function Header({ logo, children }: HeaderProps) {
	return (
		<header className="border border-b flex h-12 md:h-18 w-full shrink-0 items-center px-4 md:px-6">
			{logo}

			<div className="ml-auto flex gap-2">{children}</div>
		</header>
	);
}

export { Header };
