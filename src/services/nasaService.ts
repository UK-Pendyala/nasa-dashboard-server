// src/services/nasaService.ts
import { http } from '../utils/http';
import { Neo } from '../types';
import { NeoBrief } from '../types/';
import { NeoFeedResponse } from '../types';
import { GetNeoBriefsParams } from '../types/GetNeoBriefsParams';

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = process.env.NEO_FEED_BASE_URL || 'https://api.nasa.gov/neo/rest/v1/feed';

/**
 * Converts a detailed Near-Earth Object (NEO) into a brief summary for a specific day.
 *
 * @function toBrief
 * @param {Neo} neo - The detailed NEO object containing all its properties.
 * @param {string} day - The specific date (in YYYY-MM-DD format) to filter the close approach data.
 * @returns {NeoBrief | null} A brief summary of the NEO for the given day, or null if no valid data is found.
 */
function toBrief(neo: Neo, day: string): NeoBrief | null {
  const approach = neo.close_approach_data.find((c) => c.close_approach_date === day);
  if (!approach) return null;

  const min = neo.estimated_diameter.meters.estimated_diameter_min;
  const max = neo.estimated_diameter.meters.estimated_diameter_max;

  const closenessKm = parseFloat(approach.miss_distance.kilometers);
  const relativeVelocityKmS = parseFloat(approach.relative_velocity.kilometers_per_second);

  if (!Number.isFinite(closenessKm) || !Number.isFinite(relativeVelocityKmS)) {
    return null;
  }

  return {
    id: neo.id,
    name: neo.name,
    sizeMeters: (min + max) / 2,
    closenessKm,
    relativeVelocityKmS,
    hazardous: neo.is_potentially_hazardous_asteroid,
  };
}

/**
 * Fetches a list of brief summaries (NeoBrief items) for Near-Earth Objects (NEOs) within a specified date range.
 *
 * @function getNeoBriefs
 * @param {GetNeoBriefsParams} params - The parameters containing the start and end dates for the NEO data.
 * @returns {Promise<{ items: NeoBrief[] }>} A promise that resolves to an object containing an array of NEO briefs.
 *
 */
export async function getNeoBriefs({ startDate, endDate }: GetNeoBriefsParams): Promise<{
  items: NeoBrief[];
}> {
  const effectiveEnd = endDate ?? startDate;

  let url = `${BASE_URL}?start_date=${encodeURIComponent(startDate)}&api_key=${NASA_API_KEY}`;
  if (endDate) {
    url += `&end_date=${encodeURIComponent(endDate)}`;
  }

  const res = await http.get<NeoFeedResponse>(url);

  // near_earth_objects is a map: { "YYYY-MM-DD": Neo[] }
  const feed = res.data.near_earth_objects ?? {};

  const items: NeoBrief[] = [];
  for (const [day, neos] of Object.entries(feed)) {
    if (!neos) continue;

    for (const neo of neos) {
      const brief = toBrief(neo, day);
      if (brief) {
        items.push(brief);
      }
    }
  }

  return { items };
}
