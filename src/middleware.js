import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    // Obtiene el token (verifica si el usuario está autenticado)
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const userRol = token?.rol; // Obtiene el rol del usuario desde el token

    // Path de la URL actual
    const path = request.nextUrl.pathname;

    // Define rutas públicas (accesibles sin autenticación)
    const isPublicPath = path === '/login';

    // Si está en una ruta pública y está autenticado, redirige al dashboard
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));        
    }

    if (path === '/clients/mapa' && userRol !== 'admin') {
        // Si el usuario no es admin y está intentando acceder a la ruta /admin, redirige a la página de inicio
        return NextResponse.redirect(new URL('/clients', request.url));
        
    }

    // Si no está autenticado y no está en una ruta pública, redirige a login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // De lo contrario, continúa normalmente
    return NextResponse.next();
}

// Define en qué rutas debe ejecutarse el middleware
export const config = {
    matcher: [
        // Aplica a todas las rutas excepto las que comienzan con:
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};