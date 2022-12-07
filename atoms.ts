import { ethers }  from 'ethers';
import { atom } from 'jotai'

export const serversAtom = atom<{ icon: string; name: string; id: string }[]>(
  []
)

export const channelsAtom = atom<{ value: string; label: string }[]>([])

export const rolesAtom = atom<{ value: string; label: string }[]>([])

export const strategiesAtom = atom<{ value: string; label: string, strategy_type: string }[]>([])

export const userAtom = atom<{ userId: string }>({ userId: '' })

export const governatorUserAtom = atom<{ userId: string, discordId: string, discordUsername: string }>({ userId: '', discordId: '', discordUsername: '' })

export const providerAtom = atom<ethers.providers.Web3Provider>(null as unknown as ethers.providers.Web3Provider)
