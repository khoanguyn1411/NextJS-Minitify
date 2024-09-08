import { Button } from "@nextui-org/button";
import { Input, NextUIProvider } from "@nextui-org/react";
import Link from "next/link";
import { type FC, type PropsWithChildren } from "react";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextUIProvider>
      <h1>This is main layout</h1>

      <Button>This is test button</Button>
      <Input/>

      <Link href={"/user-musics"}>User music</Link>
      <Link href={"/trending-musics"}>Trending music</Link>
      <Link href={"/"}>Home</Link>
      {children}
    </NextUIProvider>
  );
};
