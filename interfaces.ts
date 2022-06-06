export interface Poll {
  _id: string
  createdAt: string
  title: string
  channel_id: number
  author_user_id: number | string
}

export interface RenderedPoll {
  id?: string
  created?: string
  name?: string
  channel?: string | undefined
  author?: number | string
  votes?: number
  actions?: JSX.Element
}

export interface Address {
  _id: string
  createdAt: string
  updatedAt: string
  user_id: string
  provider_id: string
  verified: boolean
  verification_message: string
  nonce: string
}