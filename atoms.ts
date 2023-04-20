import { governatorApiWithSessionCredentials } from 'constants/axios';
import { ethers }  from 'ethers';
import { Session } from 'interfaces';
import { atom } from 'jotai'
import { loadable } from "jotai/utils"


export const serversAtom = atom<{ icon: string; name: string; id: string }[]>(
  []
)

export const channelsAtom = atom<{ value: string; label: string }[]>([])

export const rolesAtom = atom<{ value: string; label: string }[]>([])

export const strategiesAtom = atom<{ value: string; label: string, strategy_type: string }[]>([])

// export const userAtom = atom<{ userId: string }>({ userId: '' })

// export const governatorUserAtom = atom<{ userId: string, discordId: string, discordUsername: string }>({ userId: '', discordId: '', discordUsername: '' })

// export const sessionAtom = atom<Session | AxiosError>({
//   governatorId: '',
//   status: 401,
//   oauthProfile: {
//     discord_username: '',
//     discriminator: '',
//     _id: '',
//     avatar: '',
//     provider_id: '',
//   }
// })

// const fetchCountAtom = atom(
//   (get) => get(countAtom),
//   async (_get, set, url) => {
//     const response = await fetch(url)
//     set(countAtom, (await response.json()).count)
//   }
// )

// const fetchFunc = async () => await (await governatorApiWithSessionCredentials.get(`/auth/session`).catch()).data

// // const asyncAtom = atom<Promise<Session>>(fetchFunc)

// const asyncWriteAtom = atom(
//   () => governatorApiWithSessionCredentials.get(`/auth/session`), 
//   async (get, set, update) => {
//     console.log('heretetete')  
//     // governatorApiWithSessionCredentials.  
//       return (await governatorApiWithSessionCredentials.options(`/auth/session`, { 
//       baseURL: '/proxy',
//       withCredentials: true ,
//       validateStatus: (code) => {
//         if (code === 200) return true
//         if (code === 401) return true
//         else return false
//       }
//     }))
//     }
// )

// export const loadableSessionAtom = loadable(asyncWriteAtom)

// export const finalAtom = atom(
//   (get) => get(loadableSessionAtom),
//   (get, set) => {
//      console.log('here')
//       set(asyncWriteAtom, fetchFunc)
//   }
// )

export const providerAtom = atom<ethers.providers.Web3Provider>(null as unknown as ethers.providers.Web3Provider)
