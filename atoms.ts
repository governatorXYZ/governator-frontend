import { atom } from 'jotai'

export const serversAtom = atom<{ icon: string; name: string; id: string }[]>(
  []
)
