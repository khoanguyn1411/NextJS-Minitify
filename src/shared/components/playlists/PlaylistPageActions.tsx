"use client";

import { type User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FC } from "react";

import { type IPlaylist, type IPlaylistDetail } from "@/core/apis/playlistApis";

import { DeletePlaylistButton } from "./DeletePlaylistButton";
import { EditPlaylistButton } from "./EditPlaylistButton";

type Props = {
  readonly playlist: IPlaylist | IPlaylistDetail;
  readonly userId: User["id"] | null;
};

export const PlaylistPageActions: FC<Props> = ({ playlist, userId }) => {
  const router = useRouter();
  const handleDeleteComplete = () => {
    router.push("/library");
  };
  return (
    <div className="flex flex-col gap-3">
      <EditPlaylistButton playlist={playlist} userId={userId} />
      <DeletePlaylistButton
        onDeleteComplete={handleDeleteComplete}
        playlist={playlist}
      />
    </div>
  );
};
