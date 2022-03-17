export interface Poll {
  _id: string
  createdAt: string
  title: string
  channel_id: number
  author_user_id: number
}

export interface RenderedPoll {
  id: string
  created: string
  name: string
  channel: string | undefined
  author: number
  votes: number
  actions: JSX.Element
}
