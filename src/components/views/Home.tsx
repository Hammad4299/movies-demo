"use client";
import { Movie } from "@/models";
import React, { useState } from "react";
import AppButton from "../form/button";
import Link from "next/link";
import { Header } from "./Header";
import { useRouter } from "next/navigation";
import { PaginationHandler } from "../pagination/paginator";
import { PaginatedResponse } from "@/types/pagination";
import { getUserMovies } from "@/app/actions";

interface Props {
    data?: PaginatedResponse<Movie>;
}
export const Home: React.FC<Props> = ({ data }) => {
    const [movieList, setMovieList] = useState(data?.items || []);
    const [maxPages, setMaxPages] = useState(
        data?.paginationMeta.totalPages || 1
    );
    const router = useRouter();
    const [pageNumber, setPageNumber] = useState(1);
    async function fetchMovieList(page = pageNumber) {
        return await getUserMovies(page);
    }

    async function updatePageIndex(page: number) {
        setPageNumber(page);
        const data = await fetchMovieList(page);
        setMovieList(data?.items || []);
        if (data?.paginationMeta.totalPages !== maxPages) {
            setMaxPages(data?.paginationMeta.totalPages);
        }
    }
    return (
        <div>
            {!data?.items.length && (
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
            {data?.items.length && data?.items.length > 0 && (
                <div className="flex flex-col gap-3">
                    <Header />
                    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mt-16 gap-4">
                        {movieList.map((movie) => (
                            <div
                                onClick={() =>
                                    router.push(`/movie/${movie.id}`)
                                }
                                key={movie.id}
                                className="hover:bg-[#1e414e] bg-appColor-100 rounded-[12px] p-2 pb-4 cursor-pointer duration-500 hover:bg-red">
                                <div
                                    className="pb-2 mb-1"
                                    style={{ aspectRatio: "133/200" }}>
                                    <img
                                        style={{
                                            aspectRatio: "133/200",
                                        }}
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="object-cover min-h-full min-w-full rounded-[10px]"
                                    />
                                </div>
                                <h5 className="font-medium">{movie.title}</h5>
                                <span className="text-bodySmall font-normal">
                                    {movie.year}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <PaginationHandler
                pageNumber={pageNumber}
                setPages={updatePageIndex}
                maxPages={maxPages}
            />
        </div>
    );
};

export default Home;
