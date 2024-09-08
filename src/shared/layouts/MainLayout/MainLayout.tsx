import Link from "next/link";

import { type FC, type PropsWithChildren } from "react";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <h1>This is main layout</h1>
      <Link href={"/user-musics"}>User music</Link>
      <Link href={"/trending-musics"}>Trending music</Link>
      <Link href={"/"}>Home</Link>
      {children}
    </div>
  );
};
