/**
 * @interface NeoBrief
 * Represents a brief summary of a near-Earth object (NEO).
 *
 * @property {string} id - The unique identifier of the NEO.
 * @property {string} name - The name of the NEO.
 * @property {number} sizeMeters - The estimated size of the NEO in meters.
 * @property {number} closenessKm - The closest approach distance of the NEO to Earth in kilometers.
 * @property {number} relativeVelocityKmS - The relative velocity of the NEO in kilometers per second.
 * @property {boolean} hazardous - Indicates whether the NEO is potentially hazardous.
 */
export interface NeoBrief {
  id: string;
  name: string;
  sizeMeters: number;
  sizeFeet: number;
  closenessKm: number;
  closenessMiles: number;
  relativeVelocityKmH: number;
  relativeVelocityMiH: number;
  hazardous: boolean;
}
