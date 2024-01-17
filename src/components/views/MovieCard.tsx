"use client";
import { Movie } from "@/models";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import DeleteImg from "@/../public/img/delete.png";
import Spinner from "@/../public/img/spinner.svg";

interface Props {
    movie: Movie;
    deleteMovie: (movieId: number) => Promise<void>;
}
const MovieCard: React.FC<Props> = ({ movie, deleteMovie }) => {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    async function deleteMovieFromList(
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
        e.stopPropagation();
        try {
            setDeleting(true);
            await deleteMovie(movie.id);
        } catch (e) {
            console.error(e);
        }
        setDeleting(false);
    }
    return (
        <div
            onClick={() => router.push(`/movie/${movie.id}`)}
            className="hover:bg-[#1e414e] bg-appColor rounded-[12px] p-4 pb-8 md:p-2 md:pb-4 cursor-pointer duration-500 hover:bg-red">
            <div
                className="pb-2 mb-1 relative group"
                style={{ aspectRatio: "133/200" }}>
                <Image
                    style={{
                        aspectRatio: "133/200",
                    }}
                    src={movie.poster}
                    alt={movie.title}
                    height="420"
                    width="280"
                    className="object-cover min-h-full min-w-full rounded-[10px]"
                />
                <div
                    onClick={deleteMovieFromList}
                    className={`h-8 w-8 absolute rounded-full bg-red-500 top-2 right-2 flex items-center justify-center cursorp-pointer duration-300 opacity-0 group-hover:opacity-100 ${
                        deleting && "opacity-100"
                    }`}>
                    {!deleting ? (
                        <Image
                            src={DeleteImg}
                            height="15"
                            width="15"
                            alt="Delete"
                        />
                    ) : (
                        <Image
                            src={Spinner}
                            height="15"
                            width="15"
                            alt="deleting"
                            className="animate-spin"
                        />
                    )}
                </div>
            </div>
            <h5 className="font-medium">{movie.title}</h5>
            <span className="text-bodySmall font-normal">{movie.year}</span>
        </div>
    );
};

export default MovieCard;
