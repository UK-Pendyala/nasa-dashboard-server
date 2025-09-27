import Fastify from 'fastify';
import cors from '@fastify/cors';
import nasaRoutes from './src/routes/nasa.routes';
import { validatorCompiler } from './src/core/validatorCompiler';
import { errorHandler } from './src/core/errorHandler';
import corsConfig from './src/core/corsConfig';
import path from 'path';


import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { registerSwagger } from './src/core/swaggerConfig';


/**
 * Builds and configures the Fastify application instance.
 *
 * This function initializes a Fastify application with the following configurations:
 * - Sets a custom validator compiler for schema validation.
 * - Sets a global error handler for handling application errors.
 * - Registers CORS middleware.
 * - Registers application routes, including the NASA API routes.
 * - Registers Swagger and Swagger UI for API documentation.
 * - Defines a root endpoint (`/`) for a basic health check.
 */
export async function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);

  app.setErrorHandler(errorHandler);

  await app.register(cors, corsConfig);
  
  // Register routes
  app.register(nasaRoutes, { prefix: 'amex-challenge/api/nasa' });

  app.get('/', async (request, reply) => {
    reply.send({ message: 'NASA API is up. Use /near-earth-objects endpoint.' });
  });

  await registerSwagger(app);
  return app;
}
