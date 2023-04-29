import { DefaultSession } from "next-auth";

export interface SessionExtension extends DefaultSession {
  accessToken: string;
  discordId: string;
}

export interface Poll {
  _id: string
  createdAt: string
  title: string
  client_config: ClientConfigDiscord[]
  author_user_id: number | string
  poll_options: PollOption[]
  end_time: string
  description: string
  strategy_config: StrategyConfig[]
}

export interface PollOption {
  poll_option_id: string;
  poll_option_name: string;
  poll_option_emoji: string;
}

export interface BlockHeight {
  chain_id: string,
  block: string,
}

interface StrategyConfig {
  strategy_id: string
  strategy_type: string
  block_height: BlockHeight[]
}

interface ClientConfigBase {
  provider_id: string,
}

interface ClientConfigDiscord extends ClientConfigBase {
  channel_id: string;
  message_id: string;
  guild_id: string;
  role_restrictions: string[];
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