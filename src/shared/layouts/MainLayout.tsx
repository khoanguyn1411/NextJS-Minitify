"use client";

import { type User } from "@prisma/client";
import { type FC, type PropsWithChildren } from "react";

import { UserContext } from "../hooks/useCurrentUser";
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
  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
};
