import { discordAxios } from 'constants/axios'
import { useAtom } from 'jotai'
import { serversAtom } from 'atoms'
import { useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const useServers = () => {
  const { data: session } = useSession()
  const [servers, setServers] = useAtom(serversAtom)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const guildId = router.asPath.length >= 3 ? router.asPath.split('/')[2] : ''
  const currentServer = servers.find(s => s.id === guildId)

  const getUserGuilds = useCallback(async () => {
    if (!servers.length) {
      try {
        setLoading(true)
        const data = await discordAxios(session?.accessToken as string).get(
          '/users/@me/guilds'
        )
        setLoading(false)
        setServers(data.data)
      } catch (e) {
        console.log({ e })
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
