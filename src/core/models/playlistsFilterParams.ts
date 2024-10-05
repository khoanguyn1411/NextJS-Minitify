import { type Song, type User } from "@prisma/client";

import { type BaseFilterParams } from "./baseFilterParams";

export type PlaylistsFilterParams = BaseFilterParams.Combined & {
  readonly userId?: User["id"];
  readonly songIdIncluded?: Song["id"];
};
