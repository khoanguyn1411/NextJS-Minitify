import { type Artist, type Tag } from "@prisma/client";

import { type SongSortOptions } from "../apis/songApis";
import { type BaseFilterParams } from "./baseFilterParams";

export type SongsFilterParams = BaseFilterParams.Combined<SongSortOptions> & {
  readonly tagIds?: Tag["id"][];
  readonly artistIds?: Artist["id"][];
};
