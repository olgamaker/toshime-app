# App

This folder contains the Next.js client for the BTC payment demo. It allows you to create a temporary wallet, generate new receiving addresses and track incoming payments.

## Development

Install dependencies at the repository root and start the dev server:

```bash
pnpm install
pnpm --filter app dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment variables

Create an `.env.local` file inside `apps/app` with at least:

```
SESSION_SECRET=your-session-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Other variables used by the listener service, such as `TATUM_API_KEY`, are explained in the repository `README.md`.

## Features

- Generates an HD wallet and stores the session in a signed cookie.
- Derives unused payment addresses via `/api/generate-address`.
- Polls mempool.space to update balance information and payment status.
