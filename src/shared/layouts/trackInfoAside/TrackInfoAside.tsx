import { type FC } from "react";
import { Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";

import { usePlayingSong } from "@/shared/hooks/usePlayingSong";

export const TrackInfoAside: FC = () => {
  const { playingSong } = usePlayingSong();
  if (playingSong == null) {
    return (
      <div>
        <p>No song is playing.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <Image
        isBlurred
        classNames={{ wrapper: "!max-w-full", img: "w-full" }}
        alt={playingSong.name}
        src={playingSong.imageUrl}
      />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{playingSong.name}</h1>
        <p>{playingSong.artists.map((artist) => artist.name).join(", ")}</p>
      </div>
      <Divider />
      {playingSong.artists.map((artist) => (
        <div key={artist.name}>
          <Card>
            <CardBody>
              <Image
                classNames={{ wrapper: "!max-w-full", img: "w-full" }}
                src={artist.imageUrl}
                alt={artist.name}
              />
            </CardBody>
            <CardFooter className="flex flex-col gap-2 items-start">
              <p className="font-bold">{artist.name}</p>
              <p className="truncate-3 text-xs">{artist.biography}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
