import { type User } from "lucia";
import { useEffect, useState, type FC } from "react";

import { type IPlaylist } from "@/core/apis/playlistApis";
import { type Pagination } from "@/core/models/pagination";
import { assertNonNull } from "@/shared/utils/assertNonNull";

import { PlaylistCreationForm } from "./PlaylistCreationForm";
import { PlaylistsTable } from "./PlaylistsTable";

type Props = {
  readonly isLoading: boolean;
  readonly playlistsPage: Pagination<IPlaylist> | null;
  readonly userId: User["id"] | null;
};

export const PlaylistModalContent: FC<Props> = ({
  playlistsPage,
  isLoading,
  userId,
}) => {
  const getMode = () => {
    if (playlistsPage == null || isLoading) {
      return "loading";
    }
    if (playlistsPage.items.length == 0) {
      return "create";
    }
    return "view";
  };

  const [mode, setMode] = useState<"view" | "create" | "loading">(getMode);

  useEffect(() => {
    setMode(getMode());
  }, [playlistsPage, isLoading]);

  if (mode === "loading") {
    return <div>Loading..</div>;
  }
  if (mode === "create") {
    return <PlaylistCreationForm userId={userId} />;
  }
  assertNonNull(playlistsPage);
  return <PlaylistsTable playlistsPage={playlistsPage} userId={userId} />;
};
