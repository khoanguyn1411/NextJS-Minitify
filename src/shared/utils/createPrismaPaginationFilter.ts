import { type BaseFilterParams } from "@/core/models/baseFilterParams";

export function createPrismaPaginationFilter(
  pagination: BaseFilterParams.Pagination,
) {
  const skip = pagination.pageNumber * pagination.pageSize;

  return {
    skip,
    take: pagination.pageSize,
  };
}
