
import { NextResponse, NextRequest } from 'next/server'

import { routing } from './i18n/routing';
import createMiddleware from "next-intl/middleware";



const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
    // your custom pre-logic
    console.log('🌍 proxy hit:', req.nextUrl.pathname);
    return intlMiddleware(req);
}


export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

