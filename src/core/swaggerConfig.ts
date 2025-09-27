import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import path from 'path';

/**
 * Registers Swagger and Swagger UI for the Fastify application.
 *
 * @function registerSwagger
 * @param {FastifyInstance} app - The Fastify instance to which Swagger will be registered.
 *
 * @description
 * This function sets up Swagger for serving the OpenAPI specification and Swagger UI for interactive API documentation.
 * - Swagger:
 *   - Mode: Static
 *   - Specification Path: `docs/openapi.yaml`
 *   - Base Directory: `docs`
 * - Swagger UI:
 *   - Route Prefix: `/docs`
 *   - UI Configuration: Expands documentation as a list and disables deep linking.
 */
export async function registerSwagger(app: FastifyInstance) {
  // Register Swagger for OpenAPI specification
  await app.register(swagger, {
    mode: 'static',
    specification: {
      path: path.resolve(process.cwd(), 'docs/openapi.yaml'),
      baseDir: path.resolve(process.cwd(), 'docs'),
    },
  });

  // Register Swagger UI for interactive API documentation
  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: false },
  });
}
