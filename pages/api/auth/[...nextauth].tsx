import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: "https://discord.com/api/oauth2/authorize?type=token&scope=identify+guilds",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({token, user, account, profile, isNewUser}) {
      // console.log({token, user, account, profile, isNewUser})
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;

    },
    async session({ session, token }) {

      // session.user = session.user
      session.accessToken = token.accessToken

      return session
    }
  },
})