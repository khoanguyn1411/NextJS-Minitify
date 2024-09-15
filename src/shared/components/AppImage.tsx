import { Image, type ImageProps } from "@nextui-org/react";
import NextImage from "next/image";
import { useState, type FC } from "react";

type Props = ImageProps;

export const AppImage: FC<Props> = (props) => {
  const [imageSrc, setImageSrc] = useState<string>(props.src ?? "");
  const placeholderSrc = "/assets/image-placeholder.svg";

  const handleError = () => {
    setImageSrc(placeholderSrc);
  };

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
