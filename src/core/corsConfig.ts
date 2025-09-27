// src/core/corsConfig.ts
/**
 * Configuration for Cross-Origin Resource Sharing (CORS) in a Fastify application.
 *
 * @file corsConfig.ts
 * @module src/core/corsConfig
 *
 * @description
 * This module defines the CORS configuration for the Fastify application. It dynamically determines the allowed origins
 * based on an environment variable (`CORS_ALLOWLIST`) or defaults to a predefined list. It also specifies the allowed
 * HTTP methods and headers.
 *
 * @constant {string[]} DEFAULT_ALLOWLIST - The default list of allowed origins.
 * @constant {string[]} ENV_ALLOWLIST - The list of allowed origins derived from the `CORS_ALLOWLIST` environment variable.
 * @constant {string[]} ALLOWLIST - The final list of allowed origins, prioritizing `ENV_ALLOWLIST` over `DEFAULT_ALLOWLIST`.
 * @constant {FastifyCorsOptions} corsConfig - The CORS configuration object for Fastify.
 */

import type { FastifyCorsOptions } from '@fastify/cors';

const DEFAULT_ALLOWLIST = ['http://localhost:3001', 'http://127.0.0.1:3001'];

const ENV_ALLOWLIST = (process.env.CORS_ALLOWLIST || '')
  .split(',')
  .map((s) => s.trim())
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
