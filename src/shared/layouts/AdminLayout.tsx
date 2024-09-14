import { type FC, type PropsWithChildren } from "react";

import { AdminNavigationAside } from "./adminNavigationAside/AdminNavigationAside";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-10 grid grid-cols-5 h-screen gap-3">
      <div className="bg-primary-900 h-full rounded-md p-container">
        <AdminNavigationAside />
      </div>
      <div className="p-container bg-primary-900 h-full rounded-md col-span-4">
        {children}
      </div>
    </div>
  );
};
