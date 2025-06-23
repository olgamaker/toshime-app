export default function Page() {
	return (
		<main className="prose px-4 py-8">
			<h1>ToshiApp</h1>
			<p>
				The ToshiApp is the Next.js client found in <code>apps/app</code>. It
				lets you create a temporary wallet, generate payment addresses and track
				incoming BTC transactions.
			</p>
			<h2>Development</h2>
			<ol>
				<li>
					Install dependencies with <code>pnpm install</code>.
				</li>
				<li>
					Start the dev server using <code>pnpm --filter app dev</code>.
				</li>
			</ol>
			<p>
				The app will be available at <code>http://localhost:3000</code>.
			</p>
			<h2>Environment variables</h2>
			<p>
				Create an <code>.env.local</code> file inside <code>apps/app</code> with
				at least:
			</p>
			<pre>{`SESSION_SECRET=your-session-secret\nNEXT_PUBLIC_BASE_URL=http://localhost:3000`}</pre>
			<p>
				Additional variables used by the listener service such as
				<code>TATUM_API_KEY</code> are described in the repository
				<code>README.md</code>.
			</p>
		</main>
	);
}
