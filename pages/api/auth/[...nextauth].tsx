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
    async jwt(anything) {
      
      console.log(anything)
      
      if( anything.trigger && anything.trigger === 'signIn') {
        anything.token.accessToken = (anything.account as Account).access_token
        anything.token.refreshToken = (anything.account as Account).refresh_token
        anything.token.discordId = anything.user.id
        anything.token.name = anything.user.name
        anything.token.email = anything.user.email
      }

      return anything.token
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
