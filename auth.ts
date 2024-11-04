import NextAuth from 'next-auth';
import 'next-auth/jwt';

import config from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
