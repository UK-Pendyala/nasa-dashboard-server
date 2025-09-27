import { NeoFeed } from "./NeoFeed";

/**
 * @interface NeoFeedResponse
 * @property {NeoFeed} near_earth_objects - The collection of near-Earth objects grouped by date.
 */
export interface NeoFeedResponse {
  near_earth_objects: NeoFeed;
}