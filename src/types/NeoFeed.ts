import { Neo } from './Neo';


/**
 * @type NeoFeed
 * @type {Record<string, Neo[]>}
 * Represents a collection of near-Earth objects grouped by date, where the key is a date string and the value is an array of NEOs.
 */
export type NeoFeed = Record<string, Neo[]>;

