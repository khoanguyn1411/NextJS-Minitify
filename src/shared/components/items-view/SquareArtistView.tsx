"use client";

import { type FC } from "react";
import { useRouter } from "next/navigation";

import { type IArtist } from "@/core/apis/artistApis";

import { BaseSquareItemView } from "./BaseSquareItemView";

type Props = {
  readonly artist: IArtist;
};

export const SquareArtistView: FC<Props> = ({ artist }) => {
  const router = useRouter();
  const handleArtistClick = () => {
    router.push(`artists/${artist.id}`);
  };

  return (
    <BaseSquareItemView
      isRounded
      onClick={handleArtistClick}
      imageUrl={artist.imageUrl}
      primaryText={artist.name}
      secondaryText="Artist"
    />
  );
};
