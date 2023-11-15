# Vexa Jobs

## Description

Vexa Jobs allows users to see the jobs available at [vexastudio.com](https://vexastudio.com). By clicking on a button,
they are redirected to a form (Google Forms, Office Forms, ...) to apply.
The site's dashboard lets you read, create, modify and delete users, positions and categories.

## Installation

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in the variables
4. Run the server

```bash
npm run dev
```

## Database migration

Generate a new migration

```bash
pnpm run migrate:generate
```

Run the migrations

```bash
pnpm run migrate:deploy
```

## Deployment

### Environment variables

| Variable          | Description                    | Example                                     |
|-------------------|--------------------------------|---------------------------------------------|
| `NITRO_PRESET`    | <https://nitro.unjs.io/deploy> | netlify                                     |
| `NUXT_JWT_SECRET` | Jwt secret password            | 7b3bo3tb87o3b8                              |
| `DATABASE_URL`    | Postgresql database url        | postgres://user:password@host:port/database |

### Cloudflare

Not working yet, but you can contribute to the
branch [`fix-cloudflare-socket`](https://github.com/SPLRGE/vexa-jobs/tree/fix-cloudflare-socket).

### Netlify

1. Fork the repository
2. Create a new site on Netlify
3. Connect the repository to the site
4. Add the environment variables
5. Deploy the site

## Help

Join our [Discord server](https://discord.splrge.dev) for help.
