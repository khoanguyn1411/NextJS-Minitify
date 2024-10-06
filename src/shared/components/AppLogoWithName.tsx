import { type FC } from "react";

import { APP_NAME } from "../constants/appInfo";
import { AppLogo } from "./AppLogo";

export const AppLogoWithName: FC = () => {
  return (
    <div className="flex gap-2 items-center">
      <AppLogo /> {APP_NAME}
    </div>
  );
};
