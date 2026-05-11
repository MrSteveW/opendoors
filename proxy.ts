import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in',
  '/sign-in/drake(.*)',
  '/sign-in/wicklewood(.*)',
]);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Redirect unauthenticated users to /signin for any protected route
  if (!isPublicRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      const destination = process.env.DEMO === 'true' && req.nextUrl.pathname === '/'
        ? '/sign-in/drake'
        : '/sign-in';
      return NextResponse.redirect(new URL(destination, req.url));
    }
  }

  // Restrict /admin routes to users with role: 'admin'
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    // Verify the role in metadata
    const role = sessionClaims?.metadata.user_role;

    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
