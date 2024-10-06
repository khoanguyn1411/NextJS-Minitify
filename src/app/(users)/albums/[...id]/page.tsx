import { User } from "@nextui-org/react";
import { type Metadata } from "next";
import { BiCalendar } from "react-icons/bi";

import { getAlbumById } from "@/core/apis/albumsApis";
import { AlbumSongsListView } from "@/shared/components/albums/AlbumSongsListView";
import { AppImage } from "@/shared/components/AppImage";
import { DateUtils } from "@/shared/utils/dateUtils";
import { type DynamicRouteProps } from "@/shared/utils/types/dynamicRouteProps";

export async function generateMetadata({
  params,
}: DynamicRouteProps): Promise<Metadata> {
  const albumId = Number(params.id);
  if (isNaN(albumId)) {
    return {};
  }

  const album = await getAlbumById(albumId);

  if (album == null) {
    return {};
  }

  return {
    title: album.name,
    description: album.description,
  };
}

export default async function Page({ params }: DynamicRouteProps) {
  const albumId = Number(params.id);
  if (isNaN(albumId)) {
    return <p className="p-container">Invalid album ID.</p>;
  }

  const album = await getAlbumById(albumId);

  if (album == null) {
    return <p className="p-container">Invalid album ID.</p>;
  }
  return (
    <div className="flex flex-col">
      <div className="p-container flex gap-4">
        <AppImage
          isBlurred
          isZoomed
          src={album.imageUrl}
          alt={album.name}
          classNames={{
            wrapper: "aspect-square w-[250px] h-[250px]",
            img: "w-full object-cover aspect-square",
          }}
        />
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col gap-1">
            <span>Album</span>
            <h1 className="text-3xl flex items-center gap-2 font-bold">
              {album.name}
            </h1>
          </div>
          <p className="font-semibold flex items-center gap-2">
            <BiCalendar />
            <span>Created at {DateUtils.toReadable(album.createdDate)}</span>
          </p>

          <p className="font-semibold flex items-center gap-2">
            <BiCalendar />
            <span>{album.songs.length} songs</span>
          </p>
          <div>
            <User
              avatarProps={{ radius: "lg", src: album.artist.imageUrl }}
              name={album.artist.name}
              description="Artist of the album"
            />
          </div>

          <p>{album.description}</p>
        </div>
      </div>
      <AlbumSongsListView albumId={album.id} />
    </div>
  );
}
