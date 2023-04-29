import { SessionExtension } from 'interfaces'
import NextAuth, { Account } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization:
        'https://discord.com/api/oauth2/authorize?type=token&scope=identify+guilds',
    }),
    // ...add more providers here
  ],
  callbacks: {
    /* return {token, user, account, profile, isNewUser} */
    async jwt({token, user, account, profile, trigger}) {

      if( trigger && trigger === 'signIn') {
        token.accessToken = (account as Account).access_token
        token.refreshToken = (account as Account).refresh_token
        token.discordId = user.id
        token.name = user.name
        token.email = user.email
      }

      return token
    },
    async session({ session, token }) {
      (session as SessionExtension).accessToken = (token.accessToken as string);
      (session as SessionExtension).discordId = (token.sub as string);
      (session as SessionExtension).user!.email = (token.email as string);
      (session as SessionExtension).user!.name = (token.name as string);
      return session
    },
  },
})
