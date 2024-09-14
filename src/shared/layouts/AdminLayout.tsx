import { type FC, type PropsWithChildren } from "react";

import { AdminNavigationAside } from "./adminNavigationAside/AdminNavigationAside";
import { Header } from "./header/Header";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col gap-2">
      <div className="p-container">
        <Header />
      </div>
      <div className="pb-container px-container grid grid-cols-5 h-full gap-3">
        <div className="bg-primary-900 h-full rounded-md p-container">
          <AdminNavigationAside />
        </div>
        <div className="p-container bg-primary-900 h-full rounded-md col-span-4">
          {children}
        </div>
      </div>
    </div>
  );
};
