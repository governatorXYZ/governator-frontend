import { atom } from 'jotai'

export const serversAtom = atom<{ icon: string; name: string; id: string }[]>(
  []
)

export const channelsAtom = atom<{ value: string; label: string }[]>([])

export const rolesAtom = atom<{ value: string; label: string }[]>([])
