export interface QueryParams {
  limit?: number; // pagination limit
  offset?: number; // pagination offset
  sortBy?: string; // sort field
  sortDirection?: "ASC" | "DESC"; // sorting direction
}
