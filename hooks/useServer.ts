import { privateBaseFetcher } from 'constants/axios'
import { useAtom } from 'jotai'
import { channelsAtom, loadableSessionAtom, rolesAtom } from 'atoms'
import { useState, useCallback, useEffect } from 'react'
// import { useSession } from 'hooks/useSession'
import useServers from './useServers'
import { Session } from 'interfaces'


const useServer = () => {
  const [loading, setLoading] = useState(false)
  const [channels, setChannels] = useAtom(channelsAtom)
  const [roles, setRoles] = useAtom(rolesAtom)
  const [session] = useAtom(loadableSessionAtom)

  const { currentServer } = useServers()

  const getChannelsAndRoles = useCallback(async () => {

    if (currentServer?.id) {
      try {
        setLoading(true)

        if(session.state !== 'hasData') return;

        const channelsResponse = await privateBaseFetcher(
          `/client/discord/${currentServer.id}/channels/${(session.data as Session).oauthProfile._id}`
        )

        const sortedChannels = (
          channelsResponse?.data?.data as Record<number, string>[]
        )
          ?.map(c => {
            const entries = Object.entries(c)[0]
            return { value: entries[0], label: entries[1] }
          })
          .sort((curr, next) =>
            curr.label.toLowerCase() < next.label.toLowerCase() ? -1 : 1
          )

        setChannels(sortedChannels)

        const rolesResponse = await privateBaseFetcher(
          `/client/discord/${currentServer.id}/roles/${(session.data as Session).oauthProfile._id}`
        )

        const sortedRoles = (
          rolesResponse?.data?.data as Record<number, string>[]
        )?.map(c => {
            const entries = Object.entries(c)[0]
            return { value: entries[0], label: entries[1] }
          })
          .filter(c => {
            return c.label !== "@everyone"
          })
          .sort((curr, next) =>
            curr.label.toLowerCase() < next.label.toLowerCase() ? -1 : 1
          )
        
        setRoles(sortedRoles)

        setLoading(false)
      } catch (e) {
        setLoading(false)
      }
    }
  }, [currentServer?.id])

  useEffect(() => {
    getChannelsAndRoles()
  }, [getChannelsAndRoles])

  return { loading, roles, channels }
}

export default useServer
