# AMEX NASA Dashboard - Server

Fastify + TypeScript backend for the NASA NEO (Near-Earth Objects) dashboard.  
Exposes a single read API and a Swagger UI.

## Prerequisites

- **Node.js** ≥ 18 (Node 20 LTS recommended)
- **npm** ≥ 8

- A NASA API key (free, instant email after signup): [https://api.nasa.gov/](https://api.nasa.gov/)

## 1. Clone & Install

```bash
git clone https://github.com/UK-Pendyala/nasa-dashboard-server.git
cd nasa-dashbaord-server
npm install
```

## 2. Configure Environment

Create a `.env` file in the root directory with the variables from .env.example:

```env
# server/.env
PORT=3000
NEO_FEED_BASE_URL=
NASA_API_KEY=<YOUR_NASA_API_KEY>        # replace this with your key
CORS_ALLOWLIST=
```

- You can temporarily use `DEMO_KEY` as value for API KEY, but it’s heavily rate-limited.
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

## Linting & Formatting

This project is formatted using **Prettier** to ensure consistent code style across the codebase.

#### Configurations:

1. **`.prettierrc.json`**:
   - Defines formatting rules (e.g., quotes, line width, etc.).

2. **`eslint.config.js`**:

- Defines ESLint rules and configuration

#### Commands:

- `npm run format` – Format code using Prettier.
- `npm run lint:check` - Runs ESLint to check for linting issues in all `.ts` files within the server
- `npm rin lint:fix` - Runs ESLint with the `--fix` flag to automatically fix linting issues in the same directories.

#### Pre-commit Hook:

- **Lint-Staged**:  
  Ensures that only staged files are formatted and linted before committing.
  - Runs ESLint with `--fix` for `.ts` files.
  - Runs Prettier for `.json` and `.md` files.

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

## Trade-offs

### 1. Fastify vs Express

#### Fastify

- **Performance**:  
  Lower overhead with faster JSON handling and routing in benchmarks for typical API workloads.

- **Plugin System**:  
  Encapsulation and scoped decorators make it easier to structure large APIs.

- **Type Support**:  
  Provides good TypeScript typings out of the box (e.g., typed route parameters and replies).

#### Express

- **Familiarity & Ecosystem**:  
  Ubiquitous documentation and examples, with a huge middleware ecosystem;

- **Flexibility**:  
  Minimal core, allowing for easy addition of small routes without requiring schemas or boilerplate.

- **Tooling Inertia**:  
  Many libraries and tutorials are built using Express. (Huge online documentation and support)

#### my Choice

I chose **Fastify** due to project requirements. It provided strong TypeScript types and was amazing.

### 2. TypeScript vs JavaScript

#### TypeScript

- **Safety**:  
  Static types catch route/DTO/middleware mismatches at compile time, leading to fewer runtime bugs.

- **Developer Experience (DX)**:  
  Provides autocomplete, safer refactoring, and ensures API changes (e.g., modifying response shapes) propagate as compile errors.

- **Costs**:
  - Has steap learning curve for first time users.

#### JavaScript

- **Simplicity & Speed**:  
  No build step required, making it the fastest option for prototyping and deploying small services.

#### my Choice

I chose **TypeScript** for its correctness and maintainability as the API surface grows. Features like schemas and models integration benefit significantly from TypeScript.
