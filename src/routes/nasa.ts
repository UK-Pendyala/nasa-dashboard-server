import { FastifyInstance } from 'fastify';
import { getNeoObjects } from '../controllers/nasaController';

export default async function nasaRoutes(app: FastifyInstance) {
  app.get('/near-earth-objects', getNeoObjects);
}
