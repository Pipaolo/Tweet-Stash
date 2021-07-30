import nextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';

export default nextAuth({
  callbacks: {
    async signIn(user, account, profile) {
      if (account) {
        user.accessToken = account.accessToken;
        user.refreshToken = account.refreshToken;
        user.oauth_token = account.oauth_token;
        user.oauth_token_secret = account.oauth_token_secret;
        user.id = account.id;
      }

      if (profile) {
        user.screen_name = String(profile['screen_name']);
      }
      return true;
    },
    async session(session, userOrToken) {
      session.user = userOrToken.user as JWT;
      return session;
    },
    async jwt(token, user, acc, profile, isNewUser) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    // eslint-disable-next-line new-cap
    Providers.Twitter({
      clientId: process.env.TWITTER_API_KEY,
      clientSecret: process.env.TWITTER_API_SECRET,
    }),
  ],
});
