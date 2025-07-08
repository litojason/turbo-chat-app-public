"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { User } from "@repo/db";

type DashboardContextType = {
  profile?: User;
  setProfile: Dispatch<SetStateAction<User | undefined>>;
};

const DashboardContext = createContext<DashboardContextType | null>(null);
export const useDashboardContext = () =>
  useContext(DashboardContext) as DashboardContextType;

interface DashboardProviderProps extends PropsWithChildren {
  initialState: {
    profile: User;
  };
}

const DashboardProvider = ({
  initialState,
  children,
}: DashboardProviderProps) => {
  const [profile, setProfile] = useState<DashboardContextType["profile"]>(
    initialState.profile
  );

  return (
    <DashboardContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
