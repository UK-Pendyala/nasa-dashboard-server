// src/services/nasaService.ts
import { http } from '../utils/http';
import { Neo } from '../types';
import { NeoBrief } from '../types/';
import { NeoFeedResponse } from '../types';

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

  const minDiameterInMeters = neo.estimated_diameter.meters.estimated_diameter_min;
  const maxDiameterInMeters = neo.estimated_diameter.meters.estimated_diameter_max;

  const minDiameterInFeet = neo.estimated_diameter.feet.estimated_diameter_min;
  const maxDiameterInFeet = neo.estimated_diameter.feet.estimated_diameter_max;

  const closenessKm = parseFloat(approach.miss_distance.kilometers);
  const closenessMiles = parseFloat(approach.miss_distance.miles);

  const relativeVelocityKmH = parseFloat(approach.relative_velocity.kilometers_per_hour);
  const relativeVelocityMiH = parseFloat(approach.relative_velocity.miles_per_hour);
  if (!Number.isFinite(closenessKm) || !Number.isFinite(relativeVelocityKmH)) {
    return null;
  }

  return {
    id: neo.id,
    name: neo.name,
    sizeMeters: (minDiameterInMeters + maxDiameterInMeters) / 2,
    sizeFeet: (minDiameterInFeet + maxDiameterInFeet) / 2,
    closenessKm,
    closenessMiles,
    relativeVelocityKmH,
    relativeVelocityMiH,
    hazardous: neo.is_potentially_hazardous_asteroid,
  };
}

type Params = { startDate: string; effectiveEndDate: string };
/**
 * Fetches a list of brief summaries (NeoBrief items) for Near-Earth Objects (NEOs) within a specified date range.
 *
 * @function getNeoBriefs
 * @param {Params} params - The parameters containing the start and end dates for the NEO data.
 * @returns {Promise<{ items: NeoBrief[] }>} A promise that resolves to an object containing an array of NEO briefs.
 *
 */
export async function getNeoBriefs({ startDate, effectiveEndDate }: Params): Promise<{
  items: NeoBrief[];
}> {
  let url = `${BASE_URL}?start_date=${encodeURIComponent(startDate)}&api_key=${NASA_API_KEY}&end_date=${encodeURIComponent(effectiveEndDate)}`;
  let res;

  try {
    res = await http.get<NeoFeedResponse>(url);
  } catch (error: any) {
    console.error('Error fetching NEO data:', JSON.stringify(error.response.data.error_message));
    throw error;
  }

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
