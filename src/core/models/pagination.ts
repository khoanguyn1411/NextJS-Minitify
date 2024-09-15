/** Pagination wrapper. */
export type Pagination<T> = {
  /** Items on the page. */
  readonly items: readonly T[];

  /** Total count in the store. */
  readonly totalCount: number;

  /** Page number filter. */
  readonly pageNumber: number;

  /** Page size filter. */
  readonly pageSize: number;

  /** Total pages. */
  readonly totalPages: number;

  /** Whether the pagination have next pages. */
  readonly hasNext: boolean;

  /** Whether the pagination have prev pages. */
  readonly hasPrev: boolean;

  /** Whether the pagination has item. */
  readonly hasItem: boolean;
};
