"use client";
import { Movie } from "@/models";
import React, { useEffect, useState } from "react";
import AppButton from "../form/button";
import Link from "next/link";
import { Header } from "./Header";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationHandler } from "../pagination/paginator";
import { PaginatedResponse } from "@/types/pagination";
import { deleteMovie, getUserMovies } from "@/app/actions";
import MovieCard from "./MovieCard";

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
    const path = useSearchParams();
    useEffect(() => {
        const refreshVal = path.get("refresh");
        if (refreshVal) {
            router.push("/");
            setTimeout(() => {
                router.refresh();
            }, 200);
        }
    }, []);

    async function deleteMovieFromList(movieId: number) {
        await deleteMovie(movieId);
        setMovieList((oldList) => {
            const newList = [...oldList];
            const index = newList.findIndex((item) => item.id === movieId);
            if (index !== -1) {
                newList.splice(index, 1);
            }
            return newList;
        });
        updatePageIndex(pageNumber);
    }
    return (
        <div className="p-4 md:p-0">
            {!movieList?.length && (
                <React.Fragment>
                    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center flex justify-center items-center gap-3 flex-col">
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
            {movieList?.length > 0 && movieList?.length > 0 && (
                <React.Fragment>
                    <div className="flex flex-col gap-3">
                        <Header />
                        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mt-16 gap-4">
                            {movieList.map((movie) => (
                                <MovieCard
                                    deleteMovie={deleteMovieFromList}
                                    key={movie.id}
                                    movie={movie}
                                />
                            ))}
                        </div>
                    </div>
                    <PaginationHandler
                        pageNumber={pageNumber}
                        setPages={updatePageIndex}
                        maxPages={maxPages}
                    />
                </React.Fragment>
            )}
        </div>
    );
};

export default Home;
