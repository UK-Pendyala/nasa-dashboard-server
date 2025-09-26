// src/controllers/nasaController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { getNeoBriefs } from '../services/nasaService';
import { GetNeoBriefsParams } from '../types/GetNeoBriefsParams';
import { addDays } from '../utils/date';

type Query = GetNeoBriefsParams

export async function getNeoObjects(
  req: FastifyRequest<{ Querystring: Query }>,
  reply: FastifyReply
) {
  const { startDate, endDate } = req.query;

  if (!startDate) {
    return reply.status(400).send({
      error: 'startDate is required (YYYY-MM-DD)',
    });
  }

  try {
    const { items } = await getNeoBriefs({ startDate, endDate });

    return reply.send({
      startDate,
      endDate: endDate ? endDate : addDays(startDate, 7),
      count: items.length,
      items,
    });
  } catch (err: any) {
    req.log.error({ err }, 'Failed to fetch/transform NASA NEO feed');

    const status =
      (err?.response && Number.isInteger(err.response.status) && err.response.status) || 502;

    return reply.status(status).send({
      error: 'Upstream NASA API failed',
      detail: err?.message ?? 'Unknown error',
    });
  }
}
