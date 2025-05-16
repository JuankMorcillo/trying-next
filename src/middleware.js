import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import DoesRoleHaveAccessToURL from './lib/utils/AccessControl';

export async function middleware(request) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const userRol = 'admin'

    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login';

    const haveAccess = DoesRoleHaveAccessToURL(userRol, path);

    if (!haveAccess && token) {
        return NextResponse.redirect(new URL('/alerts', request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        // Aplica a todas las rutas excepto las que comienzan con:
        '/((?!api|_next/static|_next/image|favicon.ico|firebase-messaging-sw.js).*)',
    ],
};