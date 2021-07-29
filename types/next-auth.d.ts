import 'next-auth'
import 'next-auth/jwt'
import { User } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id?: string
    accessToken?: string
    refreshToken?: string
    oauth_token?: string
    oauth_token_secret?: string
  }
  interface Account {
    oauth_token?: string
    oauth_token_secret?: string
  }
  interface Session {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User
  }
}
