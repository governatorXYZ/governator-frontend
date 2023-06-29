import { governatorApiWithSessionCredentials, privateBaseFetcher } from "constants/axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PollResponseDto } from 'governator-sdk';
import { useToast } from "@chakra-ui/react";
import utils from '../constants/utils'
import { serversAtom, writableLoadableAtom } from "atoms";
import { useAtom } from "jotai";
import { DiscordUser } from "interfaces";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

interface GuildDto {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: Array<string>;
  permissions_new: string;
}

interface ContextValue {
  currentServer: { icon: string; name: string; id: string; } | undefined;
  communities: Array<any>;
  livePolls: Array<PollResponseDto>;
  closedPolls: Array<PollResponseDto>;
  getAllPolls: (user: string) => Promise<void>;
}

const CommunitiesContext = createContext<ContextValue | undefined>(undefined);

const MVP_ALLOWED_GUILDS = {
  "The DAO Bot Garage": "851552281249972254",
  "Bankless DAO": "834499078434979890",
  "Governator.xyz": "1092659203266580532"
};

export function CommunitiesProvider({ children }: { children: React.ReactNode }) {
  const [livePolls, setLivePolls] = useState<PollResponseDto[]>([]);
  const [closedPolls, setClosedPolls] = useState<PollResponseDto[]>([]);
  const [loadable] = useAtom(writableLoadableAtom)
  const [servers, setServers] = useAtom(serversAtom);
  const currentDate = useMemo(() => new Date(), []);
  
  const router = useRouter();

  const guildId = useMemo(() => {
    return router.asPath.length >= 3 ? router.asPath.split('/')[2] : '';
  }, [router.asPath]);

  const currentServer = useMemo(() => {
    return servers.find(s => s.id === guildId);
  }, [guildId, servers]);

  const toast = useToast();

  const getServers = useCallback(async () => {
    try {
      const { data } = await governatorApiWithSessionCredentials.get(
        'auth/discord/servers'
      );

      setServers(data.filter((server: GuildDto) => (
        Object.values(MVP_ALLOWED_GUILDS).includes(server.id)
      )));
    } catch (error) {
      console.error((error as AxiosError).message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const getAllPolls = useCallback(async () => {
    try {
      // governatorApiWithSessionCredentials
      const { data } = await privateBaseFetcher(`/poll/list`)
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
    if (utils.isAuthenticated(loadable)) {
      getServers();
    }
  }, [getServers, loadable]);


  useEffect(() => {
    if (utils.isAuthenticated(loadable)) {
      getAllPolls();
    }
  }, [getAllPolls, loadable]);

  const value: ContextValue = {
    currentServer,
    communities: servers,
    livePolls,
    closedPolls,
    getAllPolls
  };

  return (
    <CommunitiesContext.Provider
      value={value}
    >
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