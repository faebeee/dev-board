"use client";

import {createContext, FC, PropsWithChildren, useContext} from "react";

export type GhContextType = {
  owner: string;
  repo: string;
}

export const GhContext = createContext<GhContextType>({
  owner: 'Konova-AG',
  repo: 'emi-app'
});

export const useGhContext = () => useContext(GhContext);

export const GhContextProvider: FC<PropsWithChildren> = ({children}) => {
  return <GhContext.Provider value={{
    owner: 'Konova-AG',
    repo: 'emi-app'
  }}>
    {children}
  </GhContext.Provider>
}