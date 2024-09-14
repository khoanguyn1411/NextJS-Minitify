import { type BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";

import { appPrisma } from "../configs/prisma.config";

type Params<T, M> = {
  readonly result: M[];
  readonly pagination: BaseFilterParams.Pagination;
  readonly model: T;
};

export async function createPagination<
  T extends string,
  M extends Record<string, unknown>,
>({ model, result, pagination }: Params<T, M>): Promise<Pagination<M>> {
  const skip = (pagination.pageNumber - 1) * pagination.pageSize;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const total = await appPrisma[model].count();

  const hasPrev = pagination.pageNumber > 1;
  const hasNext = skip + result.length < total;

  return {
    totalCount: total,
    hasNext,
    hasPrev,
    items: result,
  };
}
