import { AuthOptions } from "next-auth";

export const authConfig: AuthOptions = {
    pages: {
        signIn: '/login',  // route for login page
    }, callbacks: {
        authorized({ auth, request: { nextUrl } }: any) {
            const isLoggedIn = !!auth?.user;
            const isOnRestrictedRoute = nextUrl.pathname.startsWith('/home');
            if (isOnRestrictedRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/home', nextUrl));
            }
            return true;
        }
    },
    providers: [], // Add providers with an empty array for now
};