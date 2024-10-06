import { type FC } from "react";

import { AppImage } from "./AppImage";

export const AppLogo: FC = () => {
  return (
    <AppImage radius="full" width={25} height={25} src={"/assets/logo.jpg"} />
  );
};
