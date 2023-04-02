import { privateBaseFetcher } from "constants/axios";
import { useGovernatorUser } from "hooks/useGovernatorUser";
import useServers from "hooks/useServers";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PollResponseDto } from 'governator-sdk';
import { useToast } from "@chakra-ui/react";

interface ContextValue {
  user: {
    userId: string;
    discordId: string;
    discordUsername: string;
  };
  loading: boolean;
  currentServer?: {
    id: string;
    name: string;
    icon: string;
  }
  communities: Array<any>;
  livePolls: Array<PollResponseDto>;
  closedPolls: Array<PollResponseDto>;
  getAllPolls: () => Promise<void>;
}

const CommunitiesContext = createContext<ContextValue | undefined>(undefined);


export function CommunitiesProvider({ children }: { children: React.ReactNode }) {
  const [livePolls, setLivePolls] = useState<PollResponseDto[]>([]);
  const [closedPolls, setClosedPolls] = useState<PollResponseDto[]>([]);
  const { loading, servers, currentServer } = useServers();
  const governatorUser = useGovernatorUser()
  const currentDate = useMemo(() => new Date(), []);

  const toast = useToast();

  const getAllPolls = useCallback(async () => {
    try {
      const { data } = await privateBaseFetcher(`/poll/list`)
      console.log(data);
      setLivePolls(data.filter(
        (poll: PollResponseDto) => (new Date(poll.end_time) > currentDate)
      ));
      setClosedPolls(data.filter((poll: PollResponseDto) => (new Date(poll.end_time) < currentDate)
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error fetching polls",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate])

  useEffect(() => {
    getAllPolls();
  }, [getAllPolls])

  const value: ContextValue = {
    user: governatorUser,
    loading,
    currentServer,
    communities: servers,
    livePolls,
    closedPolls,
    getAllPolls
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