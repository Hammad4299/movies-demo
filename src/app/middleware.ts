import sequelizeClient from "@/db/sequelize";
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select


// to restrict access for authorized pages
export default withAuth(
    function middleware(req: NextRequest) {
    },
    {
        callbacks: {
            authorized: ({ req, token }: any) => {

                if (
                    !req.nextUrl.pathname.includes('login') && token == null
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