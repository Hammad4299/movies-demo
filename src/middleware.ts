import sequelizeClient from "@/db/sequelize";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select


// to restrict access for authorized pages
// export default withAuth(
//     function middleware(req: NextRequest) { },
//     {
//         callbacks: {
//             authorized: ({ req, token }: any) => {

//                 if (
//                     !req.nextUrl.pathname.includes('login') && token == null
//                 ) {
//                     return false
//                 }
//                 return true
//             }
//         }
//     }
// )

export async function middleware(req: NextRequest) {
    // in middleware we can't use getServerSession but we can use getToken to get session indirectly
    const session = await getToken({ req: req, secret: process.env.AUTH_SECRET });
    const isLogin = req.nextUrl.pathname.includes('login');

    // redirect user to correct authorized routes
    if (!session && !isLogin) {
        return NextResponse.redirect(`${req.nextUrl.origin}/login`)
    }
    if (session && isLogin) {
        return NextResponse.redirect(`${req.nextUrl.origin}/`)
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}