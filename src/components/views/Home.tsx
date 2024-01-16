"use client";
import { Movie } from "@/models";
import { myFn } from "@/temp-methods/my-fn";
import React, { useState } from "react";
import AppButton from "../form/button";
import Link from "next/link";
import { Header } from "./Header";

interface Props {
    data?: Movie[];
}
export const Home: React.FC<Props> = ({ data = [] }) => {
    const [movieList, setMovieList] = useState(data);

    const [pageNumber, setPageNumber] = useState(1);
    async function fetchMovieList(page = pageNumber) {
        await myFn(page);
    }
    return (
        <div>
            {!data.length && (
                <React.Fragment>
                    <div className="min-h-screen text-white text-center flex justify-center items-center gap-3 flex-col">
                        <h1
                            onClick={() => fetchMovieList()}
                            className="text-h1 text-bold">
                            Your movie list is empty
                        </h1>
                        <Link href="/movie">
                            <AppButton>Add a new movie</AppButton>
                        </Link>
                    </div>
                </React.Fragment>
            )}
            {data.length > 0 && (
                <div>
                    <Header />
                </div>
            )}
        </div>
    );
};

export default Home;
