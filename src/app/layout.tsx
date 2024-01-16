import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Movies App",
    description: "App to create and edit movies",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`flex flex-col bg-appBg min-h-screen relative text-white gap-12`}>
                {children}
                <div className="mt-auto  left-0 right-0 bottom-0">
                    <Image
                        alt=""
                        width="1920"
                        height="1080"
                        src="/img/bg-bottom-bar.png"
                    />
                </div>
            </body>
        </html>
    );
}
