"use client";
import React from "react";
import AppButton from "../form/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const Header: React.FC = () => {
    const { data: session, status } = useSession();

    const router = useRouter();
    async function logoutUser() {
        console.log("logging out");
        signOut();
    }
    return (
        <div>
            <div className="flex items-center gap-1 pt-8">
                <h2 className="text-h2 font-semibold">My movies</h2>
                <Link href="/movie" className="mt-1">
                    <Image
                        alt="Add new image"
                        src="/img/add-btn.png"
                        width="30"
                        height="30"
                    />
                </Link>
                {status == "authenticated" && (
                    <div
                        onClick={() => logoutUser()}
                        className="cursor-pointer ml-auto  flex items-center justify-end gap-2">
                        <span className="text-[16px] font-bold hidden md:block">Logout</span>
                        <Image
                            src="/img/logout.png"
                            alt="LogoutImg"
                            width="30"
                            height="30"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
