import { Image } from "@nextui-org/react";
import { BiCalendar, BiCheckCircle, BiSolidMusic } from "react-icons/bi";

import { getArtistById } from "@/core/apis/artistApis";
import { DateUtils } from "@/shared/utils/dateUtils";

export default async function Page({ params }: { params: { id: string } }) {
  const artist = await getArtistById(params.id ? Number(params.id) : 0);
  if (artist == null) {
    return <p>Invalid artist ID.</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="p-container flex gap-4">
        <Image
          isBlurred
          isZoomed
          src={artist.imageUrl}
          alt={artist.name}
          classNames={{
            wrapper: "aspect-square w-[250px] h-[250px]",
            img: "w-full object-cover aspect-square",
          }}
        />
        <div className="flex gap-4 flex-col">
          <h1 className="text-3xl flex items-center gap-2 font-bold">
            {artist.name}
            <BiCheckCircle className="text-primary-400" />
          </h1>
          <p>{artist.biography}</p>
          <p className="font-semibold flex items-center gap-2">
            <BiSolidMusic /> <span>{artist.totalPlayTime} play times</span>
          </p>
          <p className="font-semibold flex items-center gap-2">
            <BiCalendar />{" "}
            <span>Join at {DateUtils.toReadable(artist.createdDate)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
