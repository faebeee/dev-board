"use client";

import {createContext, FC, PropsWithChildren, useContext} from "react";

export type GhContextType = {
  owner: string;
  repo: string;
}

export const GhContext = createContext<GhContextType>({
  owner: '',
  repo: ''
});

export const useGhContext = () => useContext(GhContext);

export const GhContextProvider: FC<PropsWithChildren & { owner: string, repo: string }> = ({children, repo, owner}) => {
  return <GhContext.Provider value={{
    owner,
    repo,
  }}>
    {children}
  </GhContext.Provider>
}