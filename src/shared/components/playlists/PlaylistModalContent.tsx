import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { type User } from "lucia";
import { useEffect, useState, type FC } from "react";
import { BiAddToQueue } from "react-icons/bi";

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
    return (
      <div>
        <PlaylistCreationForm userId={userId} />
      </div>
    );
  }
  assertNonNull(playlistsPage);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <p>
          <span className="text-primary-200 font-bold">
            {playlistsPage.totalCount}
          </span>{" "}
          playlists
        </p>
        <Tooltip content="Click to add playlist">
          <Button
            onClick={() => setMode("create")}
            color="primary"
            variant="flat"
            isIconOnly
            className="self-end"
          >
            <BiAddToQueue className="text-xl" />
          </Button>
        </Tooltip>
      </div>
      <PlaylistsTable playlistsPage={playlistsPage} userId={userId} />
    </div>
  );
};
