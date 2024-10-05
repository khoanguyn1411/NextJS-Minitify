import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { type FC } from "react";
import {
  BiAddToQueue,
  BiListPlus,
  BiListUl,
  BiSolidLeftArrow,
} from "react-icons/bi";

import { assertNonNull } from "@/shared/utils/assertNonNull";

import { PlaylistCreationForm } from "./PlaylistCreationForm";
import { PlaylistsTable } from "./PlaylistsTable";
import { usePlaylistsModalStore } from "./usePlaylistsModalStore";

export const PlaylistModalContent: FC = () => {
  const { mode, userId, playlistsPage, setMode } = usePlaylistsModalStore();

  if (mode === "loading") {
    return <div>Loading..</div>;
  }
  if (mode === "create") {
    const playlistsPageLength = playlistsPage?.items.length ?? 0;
    return (
      <div className="flex gap-4 flex-col">
        <div className="flex gap-2">
          {playlistsPageLength > 0 && (
            <button
              onClick={() => setMode("view")}
              className="flex gap-2 items-center hover:text-primary-300 transition-all"
            >
              <BiSolidLeftArrow /> Back to playlist
            </button>
          )}

          <p className="flex gap-1 items-center ml-auto">
            <BiListPlus className="text-2xl" />
            Add playlist
          </p>
        </div>

        <PlaylistCreationForm userId={userId} />
      </div>
    );
  }
  assertNonNull(playlistsPage);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <p className="flex gap-1 items-center">
          <BiListUl />
          <span className="font-bold">{playlistsPage.totalCount}</span>{" "}
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
