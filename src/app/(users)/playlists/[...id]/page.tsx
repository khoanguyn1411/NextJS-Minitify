import { Card } from "@nextui-org/react";
import { BiCalendar, BiMusic } from "react-icons/bi";

import { getPlaylistById } from "@/core/apis/playlistApis";
import { AppImage } from "@/shared/components/AppImage";
import { DeletePlaylistButton } from "@/shared/components/playlists/DeletePlaylistButton";
import { EditPlaylistButton } from "@/shared/components/playlists/EditPlaylistButton";
import { PlaylistSongsListView } from "@/shared/components/playlists/PlaylistSongsListView";
import { validateRequest } from "@/shared/services/authService";
import { DateUtils } from "@/shared/utils/dateUtils";

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();

  const playlistId = Number(params.id);
  if (isNaN(playlistId)) {
    return <p className="p-container">Invalid playlist ID.</p>;
  }

  const playlist = await getPlaylistById(playlistId);

  if (playlist == null) {
    return <p className="p-container">Invalid playlist ID.</p>;
  }

  return (
    <>
      <Card radius="none" className="flex flex-col">
        <div className="p-container flex gap-4 justify-between">
          <AppImage
            isBlurred
            isZoomed
            src={playlist.imageUrl}
            alt={playlist.name}
            classNames={{
              wrapper: "aspect-square w-[250px] h-[250px]",
              img: "w-full object-cover aspect-square",
            }}
          />
          <div className="flex flex-1 gap-2 flex-col mt-auto">
            <div className="flex flex-col gap-1">
              <span className="text-xs">
                Playlist of <span className="font-bold">{user?.fullName}</span>
              </span>
              <h1 className="text-3xl flex items-center gap-2 font-bold">
                {playlist.name}
              </h1>
            </div>
            <p className="text-xs">{playlist.description}</p>
            <p className="font-semibold flex items-center gap-2">
              <BiCalendar />
              <span>
                Create at {DateUtils.toReadable(playlist.createdDate)}
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <BiMusic />
              <span>{playlist._count.songs} songs</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <EditPlaylistButton playlist={playlist} userId={user?.id ?? null} />
            <DeletePlaylistButton playlist={playlist} />
          </div>
        </div>
      </Card>
      <PlaylistSongsListView playlistId={playlist.id} />
    </>
  );
}
