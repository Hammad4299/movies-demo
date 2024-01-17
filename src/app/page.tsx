import { getUserMovies } from "@/app/actions";
import Home from "@/components/views/Home";
import envConfig from "@/config";
import React from "react";

const HomeServer: React.FC = async () => {
    const data = await getUserMovies(1);

    return (
        <main className="container mx-auto">
            <Home data={data} />
        </main>
    );
};

export default HomeServer;
