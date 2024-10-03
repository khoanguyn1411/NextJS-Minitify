import { type Playlist } from "@prisma/client";
import { type FC } from "react";

import { type Pagination } from "@/core/models/pagination";

type Props = {
  readonly playlistPage: Pagination<Playlist> | null;
};

export const PlaylistModalContent: FC<Props> = ({ playlistPage }) => {
  if (playlistPage == null) {
    return <div>Loading..</div>;
  }
  if (playlistPage.items.length == 0) {
    return <div>No data</div>;
  }
  return <div>PlaylistModalContent</div>;
};
