"use client";

import { type User } from "@prisma/client";
import { type FC, type PropsWithChildren } from "react";

import { UserContext } from "../hooks/useCurrentUser";
import { Header } from "./header/Header";
import { NavigationAside } from "./navigationAside/NavigationAside";

type Props = {
  readonly user: User | null;
};

export const MainLayout: FC<PropsWithChildren<Props>> = async ({
  children,
  user,
}) => {
  return (
    <UserContext.Provider value={user}>
      <div className="flex flex-col gap-2 h-screen">
        <header className="p-container">
          <Header />
        </header>
        <main className="h-full grid grid-cols-6 px-2 gap-2">
          <aside className="h-full bg-primary-900 rounded-md">
            <NavigationAside />
          </aside>
          <div className="p-container col-span-4 max-h-full h-full bg-primary-900 rounded-md">
            {children}
          </div>
          <aside className="p-container h-full bg-primary-900 rounded-md">
            This is aside right
          </aside>
        </main>
        <footer className="mt-auto p-container">This is footer</footer>
      </div>
    </UserContext.Provider>
  );
};
