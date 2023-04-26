import { governatorApiWithSessionCredentials } from 'constants/axios';
import { ethers }  from 'ethers';
import { atom } from 'jotai'
import { atomWithDefault, loadable } from "jotai/utils"


export const serversAtom = atom<{ icon: string; name: string; id: string }[]>([])

export const channelsAtom = atom<{ value: string; label: string }[]>([])

export const rolesAtom = atom<{ value: string; label: string }[]>([])

export const strategiesAtom = atom<{ value: string; label: string, strategy_type: string }[]>([])

const fetchFunc = async () => await (await governatorApiWithSessionCredentials.get(`/auth/session`).catch()).data

const asyncAtom = atomWithDefault<Promise<any>>(async (get) => await fetchFunc())

export const loadableSessionAtom = loadable(asyncAtom)

export const writableLoadableAtom = atom(
  (get) => get(loadableSessionAtom),
  async (_get, set) => {
      const response = await fetchFunc().catch((error) => {error: error})
      set(asyncAtom, response)
  }
)

export const providerAtom = atom<ethers.providers.Web3Provider>(null as unknown as ethers.providers.Web3Provider)
