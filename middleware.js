import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    
    // Get token from cookies
    const token = request.cookies.get('token')?.value;
    
    // Public routes that don't require authentication
    const publicRoutes = [
        '/login',
        '/register',
        '/customer-home'
    ];
    
    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/api'));
    
    // If no token and trying to access protected route
    if (!token && !isPublicRoute) {
        // Redirect to login
        const loginUrl = new URL('/login', request.url);
        // Add return URL so we can redirect back after login
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }
    
    // If user has token and trying to access login/register, redirect to home
    if (token && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Continue with the request
    return NextResponse.next();
}

// Configure which routes should run the middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.woff$).*)',
    ],
};

