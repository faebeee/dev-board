"use client";
import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

type JiraIssueHighlightContextType = {
  active: string | null;
  setActive: (value: string | null) => void;
}

const JiraIssueHighlightContext = createContext<JiraIssueHighlightContextType>({
  active: null,
  setActive: () => {
  }
});
export const useJiraIssueHightlightContext = () => useContext(JiraIssueHighlightContext);

export const JiraIssueHighlightProvider: FC<PropsWithChildren> = ({ children }) => {
  const [active, setActive] = useState<string | null>(null);

  return <JiraIssueHighlightContext.Provider value={{
    active, setActive
  }}>
    {children}
  </JiraIssueHighlightContext.Provider>;

};