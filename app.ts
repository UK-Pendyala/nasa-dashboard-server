import Fastify from 'fastify';

export function buildApp() {
  const app = Fastify({ logger: true });

  // Register routes

  return app;
}
