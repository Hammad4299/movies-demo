import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Provider from "@/app/context/ClientProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
    title: "Movies App",
    description: "App to create and edit movies",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const heads = headers();

    const pathname = heads.get("next-url");

    console.log(pathname, session);
    // if (!session && pathname && !pathname.includes("login")) {
    //     redirect("/login");
    // }
    return (
        <html lang="en">
            <body className={`bg-appBg min-h-screen relative text-white `}>
                <Provider session={session}>
                    <div className="container mx-auto">{children}</div>
                    <div className="mt-auto absolute left-0 right-0 bottom-0">
                        <Image
                            alt=""
                            width="1920"
                            height="1080"
                            src="/img/bg-bottom-bar.png"
                        />
                    </div>
                </Provider>
            </body>
        </html>
    );
}
