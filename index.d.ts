import 'next-auth';
import { Awaitable } from '@auth/core/types';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
  type AppRouteHandlerFnContext = {
    params: Awaitable<Record<string, string | string[]>>;
  };
}
