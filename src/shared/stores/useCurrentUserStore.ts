import { type User } from "@prisma/client";
import { createContext, useContext } from "react";
export const UserContext = createContext<User | null>(null);

/** Get current user. Only available with users app. For admin app, please use validateRequest. */
export const useCurrentUserStore = () => {
  const currentUser = useContext(UserContext);
  return {
    currentUser,
  };
};
