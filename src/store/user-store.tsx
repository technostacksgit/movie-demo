"use client";
import { User } from "@/types/user";
import { createContext, useContext } from "react";
interface UserContextType {
  user: User;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUserStore = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserStore must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
