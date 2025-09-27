/**
 * @type GetNeoBriefsParams
 * Parameters for fetching NEO briefs within a specified date range.
 * @property {string} startDate - The start date for the NEO data in YYYY-MM-DD format (required).
 * @property {string} [endDate] - The end date for the NEO data in YYYY-MM-DD format (optional; defaults to startDate).
 */
export type GetNeoBriefsParams = {
  startDate: string;
  endDate?: string;
};
