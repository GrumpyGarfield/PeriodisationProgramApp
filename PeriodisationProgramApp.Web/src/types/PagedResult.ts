export type PagedResult<T> = {
  offset: number;
  limit: number;
  totalItems: number;
  items: T[];
};
