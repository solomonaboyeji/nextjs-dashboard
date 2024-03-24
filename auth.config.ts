import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    // instructing nextjs to redirect the user to our
    // custom login page instead of the default provided
    // by NextAuth library.
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;

        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // add an empty providers for now
} satisfies NextAuthConfig;
