# AMEX NASA Dashboard - Server

Fastify + TypeScript backend for the NASA NEO (Near-Earth Objects) dashboard.  
Exposes a single read API and a Swagger UI.

## Prerequisites

- **Node.js** ≥ 18 (Node 20 LTS recommended)
- **npm** ≥ 8

- A NASA API key (free, instant email after signup): [https://api.nasa.gov/](https://api.nasa.gov/)


## 1. Clone & Install

```bash
cd server
npm install
```


## 2. Configure Environment

Create a `.env` file in the `server` folder:

```env
# server/.env
PORT=3000
NEO_FEED_BASE_URL=https://api.nasa.gov/neo/rest/v1/feed
NASA_API_KEY=<YOUR_NASA_API_KEY>        # replace this with your key (do NOT commit it)
CORS_ALLOWLIST=http://localhost:3001,http://127.0.0.1:3001
```
  - You can temporarily use `DEMO_KEY`, but it’s heavily rate-limited.  
  - `CORS_ALLOWLIST` is a comma-separated list of frontend origins allowed to call this API.


## 3. Run in Development

```bash
npm start
```

- This uses `ts-node` to run `index.ts` directly.  
- The server will start on [http://localhost:3000](http://localhost:3000) (or the port specified in `PORT`).

### API Docs (Swagger)

- Open [http://localhost:3000/docs](http://localhost:3000/docs) for Swagger UI.  
- Open [http://localhost:3000/docs/json](http://localhost:3000/docs/json) for the raw OpenAPI JSON.


## 4. Run in Production

Build TypeScript → JavaScript, then run Node:

```bash
npm run build
node dist/index.js
```

- The compiled output goes to `dist/`.  
- Ensure `.env` is present on the server (or set environment variables in your process manager).

## Scripts

```json
"scripts": {
  "build": "tsc -p tsconfig.json",
  "start": "ts-node index.ts"
}
```

- **build**: Compiles the TypeScript project into `dist/` using `tsconfig.json`.  
- **start**: Runs the development server with `ts-node` (no build step).


## API Overview

### Base URL

`http://localhost:3000/amex-challenge/api/nasa`

### Endpoint

`GET /near-earth-objects?startDate=YYYY-MM-DD[&endDate=YYYY-MM-DD]`


### Query Parameters

- **startDate** (required): `YYYY-MM-DD`
- **endDate** (optional): `YYYY-MM-DD`  
  - If omitted, the backend treats it as `startDate` (or fetches NASA’s default range depending on implementation).  
  - Must not be before `startDate`.