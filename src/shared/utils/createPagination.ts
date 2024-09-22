import { type BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";

import { appPrisma } from "../configs/prisma.config";

type Params<T, M> = {
  readonly result: M[];
  readonly pagination: BaseFilterParams.Pagination;
  readonly model: T;
  readonly filters: unknown;
};

export async function createPagination<
  T extends string,
  M extends Record<string, unknown>,
>({
  model,
  result,
  pagination,
  filters,
}: Params<T, M>): Promise<Pagination<M>> {
  const skip = (pagination.pageNumber - 1) * pagination.pageSize;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const total = await appPrisma[model].count(filters);

  const hasPrev = pagination.pageNumber > 1;
  const hasNext = skip + result.length < total;

  return {
    totalCount: total,
    hasNext,
    hasPrev,
    pageNumber: pagination.pageNumber,
    pageSize: pagination.pageSize,
    totalPages: Math.ceil(total / pagination.pageSize),
    items: result,
    hasItem: result.length > 0,
  };
}
