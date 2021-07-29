import axios from 'axios'
import NextAuth from 'next-auth'
import { signIn } from 'next-auth/client'
import { JWT } from 'next-auth/jwt'
import Providers from 'next-auth/providers'
import { TwitterApi } from 'twitter-api-v2'

export default NextAuth({
  callbacks: {
    async signIn(user, account, profile) {
      if (account) {
        user.accessToken = account.accessToken
        user.refreshToken = account.refreshToken
        user.oauth_token = account.oauth_token
        user.oauth_token_secret = account.oauth_token_secret
        user.id = account.id
      }
      return true
    },
    async session(session, userOrToken) {
      session.user = userOrToken.user as JWT
      return session
    },
    async jwt(token, user, acc, profile, isNewUser) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_API_KEY,
      clientSecret: process.env.TWITTER_API_SECRET,
    }),
  ],
})
