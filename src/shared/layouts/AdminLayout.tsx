import { type FC, type PropsWithChildren } from "react";

import { AdminNavigationAside } from "./adminNavigationAside/AdminNavigationAside";
import { Header } from "./header/Header";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-container flex flex-col">
      <Header />
      <div className="p-container px-container grid grid-cols-[200px,1fr] h-main gap-3">
        <div className="bg-primary-900 h-full rounded-md">
          <AdminNavigationAside />
        </div>
        <div className="p-container overflow-auto bg-primary-900 max-h-full rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
};
