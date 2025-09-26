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
