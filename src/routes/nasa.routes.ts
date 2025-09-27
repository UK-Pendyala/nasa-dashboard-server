// src/routes/nasa.ts
import { FastifyInstance } from 'fastify';
import { getNeoObjects } from '../controllers/nasaController';
import { neoRangeJoi } from '../schema/nasaSchema';

/**
 * Registers the NASA-related routes for the Fastify application.
 *
 * @function nasaRoutes
 * @param {FastifyInstance} app - The Fastify instance to which the routes will be added.
 *
 * @description
 * This function sets up the following route:
 * - `GET /near-earth-objects`: Fetches near-Earth objects within a specified date range.
 *   - Schema: Validates query parameters using `neoRangeJoi`.
 *   - Handler: Processes the request using the `getNeoObjects` controller.
 */
export default async function nasaRoutes(app: FastifyInstance) {
  app.get('/near-earth-objects', { schema: neoRangeJoi }, getNeoObjects);
}
