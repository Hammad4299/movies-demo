import sequelizeClient from "@/db/sequelize";
import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server";

// middleware is applied to all routes, use conditionals to select


// to restrict access for authorized pages
export default withAuth(
    function middleware(req: NextRequest) {
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                console.log('in middleware', req.nextUrl);
                if (
                    !req.nextUrl.pathname.includes('login') && !req.nextUrl.pathname.includes('signin') && token == null
                ) {
                    return false
                }
                return true
            }
        }
    }
)
// export async function middleware(request: NextRequest) {
//     await sequelizeClient.sync();
// }