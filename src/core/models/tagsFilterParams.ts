import { type Song } from "@prisma/client";

import { type BaseFilterParams } from "./baseFilterParams";

export type TagsFilterParams = BaseFilterParams.Combined & {
  readonly songId: Song["id"];
};
