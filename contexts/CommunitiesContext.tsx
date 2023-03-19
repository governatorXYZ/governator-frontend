import useServers from "hooks/useServers";
import { createContext, useContext } from "react";

interface ContextValue {
  communities: Array<any>;
}

const CommunitiesContext = createContext<ContextValue | undefined>(undefined);


export function CommunitiesProvider({ children }: { children: React.ReactNode }) {
  const { loading, servers, currentServer } = useServers();


  const value: ContextValue = {
    communities: servers,
  };

  return (
    <CommunitiesContext.Provider value={value}>
      {children}
    </CommunitiesContext.Provider>
  );
  }


export function useCommunities() {
  const context = useContext(CommunitiesContext);

  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }

  return context;
}