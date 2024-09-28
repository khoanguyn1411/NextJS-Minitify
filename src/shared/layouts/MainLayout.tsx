"use client";

import { type User } from "@prisma/client";
import { useState, type FC, type PropsWithChildren } from "react";

import { type ISong } from "@/core/apis/songApis";

import { UserContext } from "../hooks/useCurrentUser";
import { PlayingSongContext } from "../hooks/usePlayingSong";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { NavigationAside } from "./navigationAside/NavigationAside";

type Props = {
  readonly user: User | null;
};

export const MainLayout: FC<PropsWithChildren<Props>> = ({
  children,
  user,
}) => {
  const [playingSong, setPlayingSong] = useState<ISong | null>(null);
  return (
    <UserContext.Provider value={user}>
      <PlayingSongContext.Provider value={{ playingSong, setPlayingSong }}>
        <div className="flex flex-col gap-2 h-screen">
          <header className="p-container sticky top-0">
            <Header />
          </header>
          <main className="h-main overflow-auto grid grid-cols-6 px-2 gap-2">
            <aside className="h-main overflow-auto bg-background rounded-md">
              <NavigationAside />
            </aside>
            <div className="p-container col-span-4 max-h-full h-main overflow-auto bg-background rounded-md">
              {children}
            </div>
            <aside className="p-container h-main overflow-auto bg-background rounded-md">
              This is aside right
            </aside>
          </main>
          <footer className="h-footer px-container">
            <Footer />
          </footer>
        </div>
      </PlayingSongContext.Provider>
    </UserContext.Provider>
  );
};
