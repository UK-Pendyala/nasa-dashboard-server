// src/routes/nasa.ts
import { FastifyInstance } from 'fastify';
import { getNeoObjects } from '../controllers/nasaController';
import { neoRangeJoi } from '../schemas/nasaSchema';

export default async function nasaRoutes(app: FastifyInstance) {
  app.get('/near-earth-objects', { schema: neoRangeJoi }, getNeoObjects);
}
