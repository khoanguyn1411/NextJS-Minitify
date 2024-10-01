/** Base filter parameters. */
export namespace BaseFilterParams {
  /** Search filter. */
  export type Search = {
    /** Search filter. */
    readonly search: string;
  };

  /** Pagination filters. */
  export type Pagination = {
    /** Page number filter. */
    readonly pageNumber: number;

    /** Page size filter. */
    readonly pageSize: number;
  };

  /** Sort filter. */
  export type Sort<T extends Record<string, unknown>> = {
    /** Field by which page should be sorted. */
    readonly sortOptions?: T;
  };

  /** Search and pagination filters. */
  export type Combined<T extends Record<string, unknown>> = Search &
    Pagination &
    Sort<T>;

  export const initialPagination: Pagination = {
    pageNumber: 0,
    pageSize: 10,
  };
}
