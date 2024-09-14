import { type BaseFilterParams } from "@/core/models/baseFilterParams";

export function createPrismaPaginationFilter(
  pagination: BaseFilterParams.Pagination,
) {
  const skip = (pagination.pageNumber - 1) * pagination.pageSize;

  return {
    skip,
    take: pagination.pageSize,
  };
}
