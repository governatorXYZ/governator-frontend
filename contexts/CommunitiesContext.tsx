import { governatorApiWithSessionCredentials, privateBaseFetcher } from "constants/axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PollResponseDto } from 'governator-sdk';
import { useToast } from "@chakra-ui/react";
import utils from '../constants/utils'
import { serversAtom, writableLoadableAtom } from "atoms";
import { useAtom } from "jotai";
import { DiscordUser, DropdownValue, LoadableWithData } from "interfaces";
import { AxiosError } from "axios";

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
  user?: DiscordUser;
  loading: boolean;
  currentServer: { icon: string; name: string; id: string; } | undefined;
  communities: Array<any>;
  livePolls: Array<PollResponseDto>;
  closedPolls: Array<PollResponseDto>;
  getAllPolls: (user: string) => Promise<void>;
  getCommunityChannels: (id: string) => Promise<DropdownValue[]>;
  getCommunityRoles: (id: string) => Promise<DropdownValue[]>;
  getCurrentServer: (id: string) => Promise<any>;
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
  const [loading, setLoading] = useState(false);
  const [currentServer, setCurrentServer] = useState<{ icon: string; name: string; id: string; } | undefined>(undefined);
  
  const currentDate = useMemo(() => new Date(), []);
  const toast = useToast();

  const getServers = useCallback(async () => {
    try {
      if(!utils.isAuthenticated(loadable)) return;
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

  const getCurrentServer = useCallback(async (id: string) => {
    try {
      setLoading(true);
      if(!utils.isAuthenticated(loadable)) return;
      const community = servers.find(s => s.id === id);
      return community;
    } catch (error) {
      console.error((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  }, [servers]);
  
  const getAllPolls = useCallback(async () => {
    try {
      // governatorApiWithSessionCredentials
      if(!utils.isAuthenticated(loadable)) return;
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
  }, [currentDate]);

  const getCommunityChannels = useCallback(async (id: string) => {
    try {
      setLoading(true)
      if(!utils.isAuthenticated(loadable)) return;
      const { data } = await privateBaseFetcher(
        `/client/discord/${id}/channels/${(loadable as LoadableWithData).data.oauthProfile._id}`
      )

      console.log({data});

      return data.data       
    } catch (e) {
      toast({
        title: "Error",
        description: "There was an error fetching channels",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false)
    }
  }, [])

  const getCommunityRoles = useCallback(async (id: string) => {
    try {
      setLoading(true)
      const { data } = await privateBaseFetcher(
        `/client/discord/${id}/roles/${(loadable as LoadableWithData).data.oauthProfile._id}`
      )

      console.log({data});

      // const sortedRoles = (
      //   rolesResponse?.data?.data as Record<number, string>[]
      // )?.map(c => {
      //     const entries = Object.entries(c)[0]
      //     return { value: entries[0], label: entries[1] }
      //   })
      //   .filter(c => {
      //     return c.label !== "@everyone"
      //   })
      //   .sort((curr, next) =>
      //     curr.label.toLowerCase() < next.label.toLowerCase() ? -1 : 1
      //   )
      
      // setRoles(sortedRoles)
      return data.data
    } catch (e) {
      toast({
        title: "Error",
        description: "There was an error fetching channels",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    if (utils.isAuthenticated(loadable) && !servers.length) {
      getServers();
      getAllPolls();
    }
  }, []);

  const value: ContextValue = {
    communities: servers,
    currentServer,
    closedPolls,
    livePolls,
    loading,
    getAllPolls,
    getCommunityChannels,
    getCommunityRoles,
    getCurrentServer
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