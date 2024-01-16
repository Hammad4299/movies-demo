import { getUserMovies } from "@/app/actions";
import Home from "@/components/views/Home";
import React from "react";

export const HomeServer: React.FC = async () => {
    const data = await getUserMovies(1);

    return (
        <main className="container mx-auto">
            <Home data={data} />
        </main>
    );
};

export default HomeServer;
