import envConfig from "@/config";
import { authenticateUser } from "@/services/authService";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(
                credentials: Record<"email" | "password", string> | undefined,
                req
            ) {
                if (typeof credentials !== "undefined") {
                    const res = await authenticateUser(
                        credentials.email,
                        credentials.password
                    );

                    if (typeof res !== "undefined") {
                        console.log("got token and logged in", res);
                        return { ...res.user, apiToken: res.token };
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            },
        }),
    ],
    secret: envConfig.nextAuthSecretKey,
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user, account }) {
            if (typeof user !== "undefined") {
                return { ...token, ...user };
            }
            return token;
        },
        async session({ session, token, user }) {
            const sanitizedToken = Object.keys(token).reduce((p, c) => {
                // strip unnecessary properties
                if (
                    c !== "iat" &&
                    c !== "exp" &&
                    c !== "jti" &&
                    c !== "apiToken"
                ) {
                    return { ...p, [c]: token[c] };
                } else {
                    return p;
                }
            }, {});
            return {
                ...session,
                user: sanitizedToken,
                apiToken: token.apiToken,
            };
        },
    },
    // pages: {
    //     signIn: '/login',
    //     signOut: '/logout'
    // }
};
