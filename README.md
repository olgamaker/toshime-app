# ToshiMe

ToshiMe is a demonstration wallet built with [Turborepo](https://turbo.build/repo). It showcases common pitfalls when generating receive-only Bitcoin addresses such as privacy concerns, sharing payment QR codes, waiting for incoming transactions and updating wallet balances.

The repository uses **Next.js**, **Tailwind CSS**, **shadcn/ui** components and is formatted with **Biome**. The codebase is organized as a monorepo with apps and packages managed by Turborepo.

The deployed ToshMe app relies on the free BlockCypher API to fetch transaction data. Please be respectful of their service and avoid excessive requests.

## Prerequisites
- Node.js 18 or later
- [pnpm](https://pnpm.io/) 9 or later
- [Turbo CLI](https://turbo.build/repo/docs)

Install Turbo globally so you can run `turbo build` or `turbo dev` from the repository root:

```bash
pnpm add turbo --global
```

Install the project dependencies:

```bash
pnpm install
```

## Environment variables
Copy `.env.sample` from `apps/app` into `.env.local` and provide your own values:

```bash
cp apps/app/.env.sample apps/app/.env.local
```

```
SESSION_SECRET=your-session-secret
BLOCKCYPHER_TOKEN=your-token
```



## Development
Start the application in development mode:

```bash
turbo dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Production build
Generate optimized builds for all packages:

```bash
turbo build
```

Then start the Next.js server:

```bash
pnpm --filter app start
```

## Testing
Run unit and integration tests:

```bash
turbo test
```


## Overview
- **Wallet privacy** – addresses are derived from an HD wallet stored only in a secure session cookie.
- **QR payment links** – easily share payment URLs as QR codes.
- **Listening for payments** – polls BlockCypher to verify that the requested amount was received.
- **Balance updates** – the wallet balance is recalculated after each check.

This project is for educational purposes only and should not be used as a production wallet.
