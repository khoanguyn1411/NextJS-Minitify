import { type User } from "lucia";
import { type FC } from "react";

import { type IPlaylist } from "@/core/apis/playlistApis";
import { type Pagination } from "@/core/models/pagination";

import { PlaylistCreationForm } from "./PlaylistCreationForm";

type Props = {
  readonly isLoading: boolean;
  readonly playlistsPage: Pagination<IPlaylist> | null;
  readonly userId: User["id"] | null;
};

export const PlaylistModalContent: FC<Props> = ({
  playlistsPage,
  isLoading,
}) => {
  if (playlistsPage == null || isLoading) {
    return <div>Loading..</div>;
  }
  if (playlistsPage.items.length == 0) {
    return <PlaylistCreationForm userId={null} />;
  }
  return <div>PlaylistModalContent</div>;
};
