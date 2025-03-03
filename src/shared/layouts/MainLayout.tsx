"use client";

import { type User } from "@prisma/client";
import classNames from "classnames";
import { type FC, type PropsWithChildren } from "react";

import { SCROLLABLE_TARGET_ID } from "../constants/ids";
import { UserContext } from "../stores/useCurrentUserStore";
import {
  PlayingSongContext,
  usePlayingSongContext,
} from "../stores/usePlayingSongStore";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { NavigationAside } from "./navigationAside/NavigationAside";
import { TrackInfoAside } from "./trackInfoAside/TrackInfoAside";

type Props = {
  readonly user: User | null;
};

export const MainLayout: FC<PropsWithChildren<Props>> = ({
  children,
  user,
}) => {
  const value = usePlayingSongContext();
  const hasPlayingSong = value.playingSong != null;
  return (
    <UserContext.Provider value={user}>
      <PlayingSongContext.Provider value={value}>
        <div className="flex flex-col gap-2 h-screen">
          <header className="p-container sticky top-0">
            <Header />
          </header>
          <main
            className={classNames(
              "h-main overflow-auto grid grid-cols-[250px_1fr_300px] px-3 gap-2",
              { "grid-cols-[300px_1fr]": !hasPlayingSong },
            )}
          >
            <aside className="h-main overflow-auto bg-background rounded-md">
              <NavigationAside />
            </aside>
            <div
              id={SCROLLABLE_TARGET_ID}
              className={classNames(
                "max-h-full h-main overflow-auto bg-background rounded-md",
              )}
            >
              {children}
            </div>
            {hasPlayingSong && (
              <aside
                className={classNames(
                  "p-container h-main overflow-auto bg-background rounded-md",
                )}
              >
                <TrackInfoAside />
              </aside>
            )}
          </main>
          <footer className="h-footer px-container">
            <Footer />
          </footer>
        </div>
      </PlayingSongContext.Provider>
    </UserContext.Provider>
  );
};
