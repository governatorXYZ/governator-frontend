import { governatorApiWithSessionCredentials } from 'constants/axios'
import { useAtom } from 'jotai'
import { serversAtom } from 'atoms'
import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

/**
 * @important to remove in the future
 * hardcode BOT GARAGE's server id as allowed
 * included the server name for readability in case we have more to whitelist
 */
const MVP_ALLOWED_GUILDS = {
  "The DAO Bot Garage": "851552281249972254",
  "Bankless DAO": "834499078434979890",
  "Governator.xyz": "1092659203266580532"
};

const useServers = () => {
  const [servers, setServers] = useAtom(serversAtom)
  const [loading, setLoading] = useState(false)
  const [retry, setRetry] = useState(0)

  const toast = useToast();
  const router = useRouter()
  const guildId = router.asPath.length >= 3 ? router.asPath.split('/')[2] : ''
  const currentServer = servers.find(s => s.id === guildId)

  const getUserGuilds = useCallback(async () => {

    const fetchData = async () => {
      try {
        const data = await governatorApiWithSessionCredentials.get(
          'auth/discord/servers'
        );
        const serversData = data.data.filter( (_guild: { id: string }) => Object.values(MVP_ALLOWED_GUILDS).includes(_guild.id))
        setServers(serversData)
        return true
      } catch (e) {
        if ((e as AxiosError).code === 'ERR_BAD_RESPONSE') {
          toast({
            title: "Error",
            description: "Something went wrong in useServers.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
        return false;
      }
    };

    if (!servers.length) {
      setLoading(true)
      const succeeded = await fetchData()
      if (!succeeded) {
        if (retry < 4) {
          setTimeout(fetchData, 500);
          setRetry(retry + 1)
        } 
        else {
          router.push('/proxy/auth/logout');
        }
      } else {
        setLoading(false)
      }
    }
  }, [servers])

  useEffect(() => {
    getUserGuilds()
  }, [getUserGuilds])

  return { loading, servers, currentServer }
}

export default useServers
