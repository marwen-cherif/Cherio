import { auth } from 'auth';

export const PUBLIC_ROUTES = ['/auth'];

function hasExtension(pathname: string) {
  const regex = /\.\w+$/;
  return regex.test(pathname);
}

export const middleware = auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (hasExtension(nextUrl.pathname)) {
    return;
  }

  if (nextUrl.pathname.startsWith('/auth')) {
    return;
  }

  if (!isAuthenticated && !isPublicRoute) {
    const url = new URL('/auth/signin', nextUrl);

    url.searchParams.append(
      'callbackUrl',
      `${nextUrl.origin}${nextUrl.pathname}`
    );

    return Response.redirect(url);
  }

  return;
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
