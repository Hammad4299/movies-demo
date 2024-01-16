"use server";
import { Movie } from "@/models";

export const myFn = async (page: number): Promise<Movie[]> => {
    console.log("fetching for page ", page);
    return new Promise((res) => {
        setTimeout(() => {
            res([
                {
                    id: 1,
                    poster: "https://images.pexels.com/photos/1052150/pexels-photo-1052150.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    title: "Scooby Doo: Stuff",
                    year: 1920,
                },
                {
                    id: 2,
                    poster: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
                    title: "Elden Ring",
                    year: 2022,
                },
            ]);
        }, 1000);
    });
};

export const myFnSingle = async (
    id: string | number
): Promise<Movie | null> => {
    return new Promise((res) => {
        setTimeout(() => {
            res({
                id: Number(id),
                poster: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
                title: "Elden Ring",
                year: 2022,
            });
        }, 1000);
    });
};
