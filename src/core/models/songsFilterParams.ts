import {
  type Album,
  type Artist,
  type Playlist,
  type Tag,
} from "@prisma/client";

import { type SongSortOptions } from "../apis/songApis";
import { type BaseFilterParams } from "./baseFilterParams";

export type SongsFilterParams = BaseFilterParams.Combined<SongSortOptions> & {
  readonly tagIds?: Tag["id"][];
  readonly artistIds?: Artist["id"][];
  readonly albumId?: Album["id"];
  readonly playlistId?: Playlist["id"];
};
