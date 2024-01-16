"use server";
import { Movie } from "@/models";

export const myFn = async (page: number): Promise<Movie[]> => {
    console.log("fetching for page ", page);
    return new Promise((res) => {
        setTimeout(() => {
            res([
                {
                    id: 1,
                    poster: "https://m.media-amazon.com/images/I/51tEXq0ZDcL._AC_UF1000,1000_QL80_.jpg",
                    title: "Spooderman",
                    year: 1920,
                },
                {
                    id: 2,
                    poster: "https://m.media-amazon.com/images/I/51tEXq0ZDcL._AC_UF1000,1000_QL80_.jpg",
                    title: "Spooderman",
                    year: 2002,
                },
            ]);
        }, 1000);
    });
};
