"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { type Artist } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FC } from "react";

import { type ISong } from "@/core/apis/songApis";
import { AppImage } from "@/shared/components/AppImage";
import { SongBaseInfoView } from "@/shared/components/items-view/SongBaseInfoView";
import { PlaylistsModal } from "@/shared/components/playlists/playlists-modal/PlaylistsModal";
import { UserActionsButton } from "@/shared/components/UserActionsButton";
import { usePlayingSongStore } from "@/shared/stores/usePlayingSongStore";

export const TrackInfoAside: FC = () => {
  const { playingSong, nextSongs, setPlayingSong } = usePlayingSongStore();
  const playlistModalDisclosure = useDisclosure();
  const router = useRouter();

  const handleSongClick = (song: ISong) => {
    setPlayingSong(song);
  };

  const handleArtistClick = (artist: Artist) => {
    router.push(`/artists/${artist.id}`);
  };

  if (playingSong == null) {
    return (
      <div>
        <p>No song is playing.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <AppImage
        isBlurred
        classNames={{ wrapper: "!max-w-full", img: "w-full" }}
        alt={playingSong.name}
        src={playingSong.imageUrl}
      />
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">{playingSong.name}</h1>
          <p>{playingSong.artists.map((artist) => artist.name).join(", ")}</p>
        </div>
        <UserActionsButton
          onPlaylistModalOpen={playlistModalDisclosure.onOpen}
        />
        <PlaylistsModal
          currentSong={playingSong}
          {...playlistModalDisclosure}
        />
      </div>
      <Divider />
      {playingSong.artists.map((artist) => (
        <div key={artist.name}>
          <Card isPressable onClick={() => handleArtistClick(artist)}>
            <CardBody>
              <AppImage
                classNames={{ wrapper: "!max-w-full", img: "w-full" }}
                src={artist.imageUrl}
                alt={artist.name}
              />
            </CardBody>
            <CardFooter className="flex flex-col gap-2 items-start">
              <p className="font-bold">{artist.name}</p>
              <p className="text-left truncate-3 text-xs">{artist.biography}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="font-bold">Playing</p>
        <SongBaseInfoView isSpinning song={playingSong} />
      </div>
      {nextSongs.length > 0 && (
        <>
          <Divider />
          <div className="flex flex-col gap-4">
            <p className="font-bold">Next songs</p>
            <Card className="flex flex-col max-h-[200px] overflow-auto justify-start">
              {nextSongs.map((song) => (
                <SongBaseInfoView
                  onClick={handleSongClick}
                  key={song.id}
                  song={song}
                />
              ))}
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
