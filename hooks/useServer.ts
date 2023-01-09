import {
  discordAxios,
  privateBaseAxios,
  privateBaseFetcher,
} from 'constants/axios'
import { useAtom } from 'jotai'
import { channelsAtom, rolesAtom } from 'atoms'
import { useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useServers from './useServers'

/**
 * @important to remove in the future
 * hardcode BOT GARAGE's - govbot-testing channel id as allowed
 * included the channel name for readability in case we have more to whitelist
 */
const MVP_ALLOWED_CHANNELS = {
  "govbot-testing": "959216625180098590"
};


const useServer = () => {
  const [loading, setLoading] = useState(false)
  const [channels, setChannels] = useAtom(channelsAtom)
  const [roles, setRoles] = useAtom(rolesAtom)
  const { data: session } = useSession()

  const { currentServer } = useServers()

  const getChannelsAndRoles = useCallback(async () => {

    if (currentServer?.id) {
      try {
        setLoading(true)

        const channelsResponse = await privateBaseFetcher(
          `/client/discord/${currentServer.id}/channels/${session?.discordId}`
        )

        // const channelsResponse = {
        //   data: channels_response
        // };

        const sortedChannels = (
          channelsResponse?.data?.data as Record<number, string>[]
        )
          ?.map(c => {
            const entries = Object.entries(c)[0]
            return { value: entries[0], label: entries[1] }
          })
          .filter(c => {
            return Object.values(MVP_ALLOWED_CHANNELS).includes(c.value)
          })
          .sort((curr, next) =>
            curr.label.toLowerCase() < next.label.toLowerCase() ? -1 : 1
          )

        setChannels(sortedChannels)

        const rolesResponse = await privateBaseFetcher(
          `/client/discord/${currentServer.id}/roles/${session?.discordId}`
        )

        // const rolesResponse = {
        //   data: roles_response
        // };

        const sortedRoles = (
          rolesResponse?.data?.data as Record<number, string>[]
        )
          ?.map(c => {
            const entries = Object.entries(c)[0]
            return { value: entries[0], label: entries[1].includes('@everyone') ? 'everyone' : entries[1] }
          })
          .sort((curr, next) =>
            curr.label.toLowerCase() < next.label.toLowerCase() ? -1 : 1
          )
        setRoles(sortedRoles)

        setLoading(false)
      } catch (e) {
        console.log({ e })
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
