"use client";

import { Image, type ImageProps } from "@nextui-org/react";
import NextImage from "next/image";
import { useEffect, useState, type FC } from "react";

import { getSrcFromApi } from "../utils/getSrcFromApi";

type Props = ImageProps & {
  readonly isFromApi?: boolean;
};

export const AppImage: FC<Props> = ({ isFromApi = false, ...props }) => {
  const getCurrentImageSrc = () => {
    if (isFromApi && props.src) {
      return getSrcFromApi(props.src);
    }
    return props.src ?? "";
  };

  const [imageSrc, setImageSrc] = useState<string>(getCurrentImageSrc);
  const placeholderSrc = "/assets/image-placeholder.svg";

  const handleError = () => {
    setImageSrc(placeholderSrc);
  };

  useEffect(() => {
    setImageSrc(getCurrentImageSrc());
  }, [props.src]);

  return (
    <>
      <Image {...props} alt={props.alt} loading="lazy" src={imageSrc} />
      <NextImage
        onError={handleError}
        src={imageSrc}
        alt=""
        fill
        className="hidden"
      />
    </>
  );
};
