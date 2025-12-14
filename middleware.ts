import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth API)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (login page)
         * - admin (admin page - handles own auth)
         */
        '/((?!api/auth|_next/static|_next/image|favicon.ico|login|admin).*)',
    ],
};

export function middleware(req: NextRequest) {
    const authToken = req.cookies.get('auth_token');
    const url = req.nextUrl.clone();

    // If no token exists, redirect to login
    if (!authToken) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
