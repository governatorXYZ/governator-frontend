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

const channels_response = {
  "uuid": "ac23d157-88eb-4334-b901-eb8cccdc5781",
  "provider_id": "discord",
  "method": "channels",
  "guildId": "851552281249972254",
  "data": [
    {
      "917544637525282887": "calendar"
    },
    {
      "959253679414845491": "mechanics-general"
    },
    {
      "903089397036101682": "general-discussion"
    },
    {
      "854435797700182048": "Discord & Bot Library Updates"
    },
    {
      "959257238982234153": "collabland-join"
    },
    {
      "989037168221650984": "NLP Bot Library Development"
    },
    {
      "979146061413236746": "K-Channels / Collab.Land Development"
    },
    {
      "959217045705207808": "Coordinape Bot Development"
    },
    {
      "979146244624617483": "K-Channels Voice"
    },
    {
      "879429393255125013": "dev workroom"
    },
    {
      "959216625180098590": "govbot-testing"
    },
    {
      "872271055195082854": "Support Libraries in Development"
    },
    {
      "868624283465826324": "slash-create"
    },
    {
      "870023414344192030": "support"
    },
    {
      "979091444461609041": "EPNS Collaboration"
    },
    {
      "920488753330552882": "polls"
    },
    {
      "989037257069576222": "violette"
    },
    {
      "959215339097423872": "The Governator"
    },
    {
      "913495301866782771": "captcha-verification"
    },
    {
      "851593351769227285": "rules"
    },
    {
      "979091665102991403": "epns-general"
    },
    {
      "979146148621205564": "kchannels-general"
    },
    {
      "979094179898617886": "EPNS Chat"
    },
    {
      "959215695147712542": "govbot-general"
    },
    {
      "893290342089125949": "discord-api"
    },
    {
      "959217196880519228": "coordinape-bot-testing"
    },
    {
      "959257235236745297": "collabland-config"
    },
    {
      "880425762799357992": "writers room"
    },
    {
      "878430061135552512": "Community Calls"
    },
    {
      "959217312207093820": "Coordinape Bot Dev Chat"
    },
    {
      "851593351769227286": "announcements"
    },
    {
      "959215794108108841": "Governator Committee"
    },
    {
      "887441481474924545": "Test Voice Channels"
    },
    {
      "906208478761205760": "coordinape-feature-set"
    },
    {
      "852147685451628545": "discordjs"
    },
    {
      "903089163207847966": "The Round Table"
    },
    {
      "906192513830903859": "govbot-feature-set"
    },
    {
      "851605692820881419": "bot-intake"
    },
    {
      "903089483732357130": "Round Table Chat"
    },
    {
      "868334809599057920": "testing-library"
    },
    {
      "851595035350401024": "Intake"
    }
  ]
}

const roles_response = {
  "uuid": "110f2cdd-f206-4017-9b89-38aa63829953",
  "provider_id": "discord",
  "method": "roles",
  "guildId": "851552281249972254",
  "data": [
    {
      "869711935787114526": "MaesBrain-Backup"
    },
    {
      "938997868147146824": "botplays"
    },
    {
      "854117804457197639": "Damocles"
    },
    {
      "857838853326241814": "BanklessDAO"
    },
    {
      "870012820207587368": "Level 1"
    },
    {
      "970838801465368589": "Baby Kong"
    },
    {
      "988548888107552830": "CO-kong-dev"
    },
    {
      "883487524754948147": "Bumblebot"
    },
    {
      "905652569194512455": "BountyBoard"
    },
    {
      "903754358292901948": "Round Table"
    },
    {
      "921217487985573948": "NOPE"
    },
    {
      "853015115308990505": "boda-bot"
    },
    {
      "940278679848747039": "Wall-Titan"
    },
    {
      "959222566986338354": "Managers"
    },
    {
      "968297585896988683": "Coordinape Test Bots"
    },
    {
      "933397414377816106": "Coordinape"
    },
    {
      "979145613025366046": "K-Channels"
    },
    {
      "959257232233607271": "Collab.Land"
    },
    {
      "959919125340233761": "DFQ-bot"
    },
    {
      "858064540393275413": "Contributors (Lvl 2)"
    },
    {
      "979090072878088242": "new role"
    },
    {
      "870013262421450842": "Level 3"
    },
    {
      "989185622973497427": "Queen Kong"
    },
    {
      "959221651051012176": "GovBot Dev Bots"
    },
    {
      "897570655707467837": "Product Support Center Staff"
    },
    {
      "918577431869272066": "Mechanical Animal"
    },
    {
      "969032638448939068": "Mechanics"
    },
    {
      "857683488131907624": "Guest Pass"
    },
    {
      "902637112900350033": "sesh"
    },
    {
      "964375646287581304": "wenHELP"
    },
    {
      "908763988685365329": "AFK"
    },
    {
      "892848010394996757": "bankless_dao_bounty_getting_star"
    },
    {
      "989037973892919329": "violette"
    },
    {
      "909854252942360636": "Bounty Board"
    },
    {
      "933396523822252084": "EPNS"
    },
    {
      "906187139308474379": "EagleOwl"
    },
    {
      "851616217034391554": "Bankless-Dev-Bot"
    },
    {
      "851552281249972254": "@everyone"
    },
    {
      "960769625916858390": "Governator"
    },
    {
      "902302614698475542": "Server Booster"
    },
    {
      "969802904292700193": "RustBucket"
    },
    {
      "945872854312976384": "GovBot Squad"
    }
  ]
}

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

        // const channelsResponse = await privateBaseFetcher(
        //   `/client/discord/${currentServer.id}/channels/${session?.discordId}`
        // )

        const channelsResponse = { 
          data: channels_response
        };

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

        // const rolesResponse = await privateBaseFetcher(
        //   `/client/discord/${currentServer.id}/roles/${session?.discordId}`
        // )

        const rolesResponse = { 
          data: roles_response
        };

        const sortedRoles = (
          rolesResponse?.data?.data as Record<number, string>[]
        )
          ?.map(c => {
            const entries = Object.entries(c)[0]
            return { value: entries[0], label: entries[1] }
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
