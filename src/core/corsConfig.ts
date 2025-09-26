// src/core/corsConfig.ts
import type { FastifyCorsOptions } from '@fastify/cors';

const DEFAULT_ALLOWLIST = [
  'http://localhost:3001',
  'http://127.0.0.1:3001',
];

const ENV_ALLOWLIST = (process.env.CORS_ALLOWLIST || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const ALLOWLIST = ENV_ALLOWLIST.length ? ENV_ALLOWLIST : DEFAULT_ALLOWLIST;

const corsConfig: FastifyCorsOptions = {
  origin: (origin, cb) => {
    // Allow server-to-server / curl / same-origin requests (no Origin header)
    if (!origin) {
      cb(null, true);
      return;
    }
    cb(null, ALLOWLIST.includes(origin));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsConfig;
