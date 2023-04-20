import { governatorApiWithSessionCredentials } from 'constants/axios';
import { ethers }  from 'ethers';
import { Session } from 'interfaces';
import { atom, Getter } from 'jotai'
import { loadable } from "jotai/utils"
import { getRouteRegex } from 'next/dist/shared/lib/router/utils';


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


const fetchFunc = async () => await (await governatorApiWithSessionCredentials.get(`/auth/session`).catch()).data

const asyncAtom = atom<Promise<Session>>(fetchFunc)

function atomWithRefresh<T>(fn: (get: Getter) => T) {
  const refreshCounter = atom(0)

  return atom(
    (get) => {
      get(refreshCounter)
      return fn(get)
    },
    (_, set) => set(refreshCounter, (i) => i + 1)
  )
}

export const refreshAtom = atomWithRefresh((get) =>
  governatorApiWithSessionCredentials.get(`/auth/session`).then((data) => data.data).catch()
  // fetch('https://jsonplaceholder.typicode.com/posts').then((r) => r.json())
)

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

export const loadableSessionAtom = loadable(asyncAtom)

// export const finalAtom = atom(
//   (get) => get(loadableSessionAtom),
//   (get, set) => {
//      console.log('here')
//       set(asyncWriteAtom, fetchFunc)
//   }
// )

export const providerAtom = atom<ethers.providers.Web3Provider>(null as unknown as ethers.providers.Web3Provider)
