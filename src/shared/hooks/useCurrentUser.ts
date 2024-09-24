import { type User } from "@prisma/client";
import { createContext, useContext } from "react";
export const UserContext = createContext<User | null>(null);

export const useCurrentUser = () => {
  const currentUser = useContext(UserContext);
  return {
    currentUser,
  };
};
