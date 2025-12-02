import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur a un cookie de session
  const token = request.cookies.get('token')?.value;
  
  const { pathname } = request.nextUrl;
  
  console.log('Authentificated user:', token ? 'Token present' : 'null');
  console.log(`${request.method} ${pathname}`);
  
  // Routes publiques (accessibles sans authentification)
  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // Si pas de token et route protégée → rediriger vers landing page
  if (!token && !isPublicRoute) {
    console.log('No token, redirecting to /');
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Si token présent, vérifier sa validité
  if (token && !isPublicRoute) {
    try {
      const response = await fetch('http://localhost:8001/auth/me', {
        headers: {
          'Cookie': `token=${token}`,
        },
      });
      
      if (!response.ok) {
        // Token invalide, supprimer le cookie et rediriger
        console.log('Invalid token, clearing and redirecting to /');
        const loginUrl = new URL('/', request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        redirectResponse.cookies.delete('token');
        return redirectResponse;
      }
    } catch (error) {
      console.error('Error validating token:', error);
      // En cas d'erreur réseau, on laisse passer pour ne pas bloquer l'utilisateur
    }
  }
  
  // Si token et sur page d'accueil → rediriger vers home
  if (token && pathname === '/') {
    console.log('Token found on /, redirecting to /home');
    const homeUrl = new URL('/home', request.url);
    return NextResponse.redirect(homeUrl);
  }
  
  return NextResponse.next();
}

// Spécifier les routes où le middleware doit s'exécuter
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (API routes)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
