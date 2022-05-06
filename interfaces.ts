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
