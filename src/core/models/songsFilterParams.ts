import { type Artist, type Tag } from "@prisma/client";

import { type BaseFilterParams } from "./baseFilterParams";

export type SongsFilterParams = BaseFilterParams.Combined & {
  readonly tagIds?: Tag["id"][];
  readonly artistIds?: Artist["id"][];
};
