# candy-nuxt-frontend

Nuxt 4 frontend for the Strapi project in `../candy-strapi-linux`.

All Strapi requests go through this app's server routes (`server/api/*`), so the
API token never reaches the browser.

## Setup

```bash
npm install
cp .env.example .env
npm run dev   # http://localhost:3000
```

In `.env`:

- `NUXT_STRAPI_TOKEN`: a read-only API token from Strapi (Settings > API Tokens).
  Without it, grant the Public role `find`/`findOne` on Science, Technology,
  Category and About instead. Draft previews always need the token.
- `NUXT_PREVIEW_SECRET`: must match `PREVIEW_SECRET` in the Strapi `.env`.

## Production

```bash
npm run build   # outputs .output/
npm run start   # node .output/server/index.mjs, loads .env if present
```

Set `PORT` / `HOST` to change where it listens (default `3000`). In production you
can also set the `NUXT_*` variables in the environment instead of `.env`.

## Strapi Preview

In the Strapi `.env`, set:

```
CLIENT_URL=http://localhost:3000
PREVIEW_SECRET=<same value as NUXT_PREVIEW_SECRET>
```

The Preview button in the admin then opens `/api/preview`, which checks the
secret, sets a draft-mode cookie and redirects to the page (`/sciences/:slug`,
`/technologies/:slug`, `/categories/:slug`, `/about`). Saving in the admin
refreshes the preview automatically.

## Routes

| Page | Strapi content |
| --- | --- |
| `/` | Latest sciences and technologies |
| `/sciences`, `/sciences/:slug` | Science |
| `/technologies`, `/technologies/:slug` | Technology |
| `/categories`, `/categories/:slug` | Category (with its sciences) |
| `/about` | About (single type) |
