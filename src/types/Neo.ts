/**
 * @interface Neo
 * Represents a near-Earth object (NEO) with detailed information about its properties, dimensions, and close approach data.
 *
 * @property {string} id - The unique identifier of the NEO.
 * @property {string} name - The name of the NEO.
 * @property {string} neo_reference_id - The reference ID of the NEO.
 * @property {string} nasa_jpl_url - The NASA JPL URL for more information about the NEO.
 * @property {number} absolute_magnitude_h - The absolute magnitude (brightness) of the NEO.
 * @property {object} estimated_diameter - The estimated diameter of the NEO in various units.
 * @property {boolean} is_potentially_hazardous_asteroid - Indicates if the NEO is potentially hazardous.
 * @property {Array<object>} close_approach_data - Data about the NEO's close approaches to Earth.
 * @property {boolean} is_sentry_object - Indicates if the NEO is a sentry object (monitored for potential impact).
 * @property {object} links - Links to additional information about the NEO.
 */
export interface Neo {
  id: string;
  name: string;
  neo_reference_id: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    meters: { estimated_diameter_min: number; estimated_diameter_max: number };
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    miles: { estimated_diameter_min: number; estimated_diameter_max: number };
    feet: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
      miles_per_hour: string;
    };
    miss_distance: { kilometers: string, lunar: string, miles: string, astronomical: string };
    orbiting_body: string;
  }>;
  is_sentry_object: boolean;
  links: {
    self: string;
  }
}
