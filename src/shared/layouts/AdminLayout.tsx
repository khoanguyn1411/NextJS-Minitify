import { type FC, type PropsWithChildren } from "react";

import { validateRequest } from "../services/authService";
import { AdminNavigationAside } from "./adminNavigationAside/AdminNavigationAside";
import { Header } from "./header/Header";

export const AdminLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { user } = await validateRequest();
  return (
    <div className="p-container flex flex-col">
      <div className="pb-2">
        <Header currentUser={user} />
      </div>
      <div className="py-container grid grid-cols-[200px,1fr] h-main-admin gap-3">
        <div className="bg-background h-full rounded-md">
          <AdminNavigationAside />
        </div>
        <div className="p-container overflow-auto bg-background max-h-full rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
};
