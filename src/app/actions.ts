"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MovieModel from "@/db/models/MovieModel";
import { Movie } from "@/models";
import {
    PaginatedResponse,
    PaginationParam,
    getOffsetFromPagination,
    getPaginationMeta,
} from "@/types/pagination";
import { createReadStream, existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { defaultTo } from "lodash";
import { getServerSession } from "next-auth/next";
import path from "path";
import { Op, where } from "sequelize";
import { z } from "zod";

const movSchema = {
    title: z
        .string({
            required_error: "Title is required",
        })
        .min(2, { message: "Title can't be less than 2 characters" }),
    year: z.number().gte(1900, { message: "Year must be greater than 1900." }),
    userId: z.string().uuid(),
};
const movieSchema = z.object({
    ...movSchema,
});
const editMovieSchema = z.object({
    ...movSchema,
    id: z.number(),
});

const PER_PAGE = 2;
async function getUserId() {
    const session = await getServerSession(authOptions);
    console.log("found session", session?.user);
    const user = session?.user as any;
    return user.id as string;
}
export async function getUserMovies(page: number = 1) {
    // Return early if the form data is invalid
    const id = await getUserId();
    if (id) {
        if (page < 1) {
            page = 1;
        }
        const params: PaginationParam = { pageNumber: page, perPage: PER_PAGE };
        const totalCount = await MovieModel.count({
            where: { userId: id },
        });
        const lastPage = Math.ceil(totalCount / PER_PAGE);
        if (lastPage < page) {
            page = lastPage;
        }
        const movies = await MovieModel.findAll({
            where: { userId: id },
            order: [['createdAt', 'DESC']],
            limit: params.perPage,
            offset: getOffsetFromPagination(params),
        });
        return {
            items: movies.map(m => m.toJSON()),
            paginationMeta: getPaginationMeta(params, {
                items: movies,
                total: totalCount,
            }),
        } as PaginatedResponse<Movie>;
    }

    throw new Error("Not authorized");
}
const uploadFile = async (file: File) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${file.name}`;
    const relPath = `/movies/${fileName}`;

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    let filePath = path.join(defaultTo(process.env.PROJECT_ROOT?.toString(), ''), '/public', relPath);

    const dirPath = filePath.split(fileName)[0];
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath);
    }

    await writeFile(filePath, buffer);
    return relPath;
}

export async function addMovie(formData: FormData) {
    const userId = await getUserId();
    const validatedFields = movieSchema.safeParse({
        title: formData.get("title"),
        year: Number(formData.get("year")),
        userId: userId,
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const file: File | null = formData.get("file") as unknown as File;

    let filePath;
    if (file) {
        filePath = await uploadFile(file);
    }

    const alreadyExist = await MovieModel.findAll({
        where: {
            [Op.and]: [{
                title: validatedFields.data.title
            }, {
                userId: userId
            }, {
                year: validatedFields.data.year
            }]
        }
    });
    if (alreadyExist.length > 0) {
        throw new Error('Movie already added.');
    }

    // Mutate data
    const newEntry = MovieModel.build({
        ...validatedFields.data,
        poster: filePath,
    } as Movie);

    await newEntry.save();
    return { data: newEntry.toJSON() };
}

export async function updateMovie(formData: FormData) {
    const userId = await getUserId();
    const validatedFields = editMovieSchema.safeParse({
        id: Number(formData.get("id")),
        title: formData.get("title"),
        year: Number(formData.get("year")),
        userId: userId,
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const file: File | null = formData.get("file") as unknown as File;

    let filePath;
    if (file) {
        filePath = await uploadFile(file);
    }

    // Mutate data

    // find old entry if any
    let row = await MovieModel.findOne({
        where: {
            id: validatedFields.data.id,
        },
    });
    if (row == null) {
        throw new Error("Movie does not exist.");
    }

    row.title = validatedFields.data.title;
    if (filePath) {
        row.poster = filePath;
    }
    row.year = validatedFields.data.year;

    await row.save();

    return { data: row.toJSON() };
}

export async function deleteMovie(movieId: number) {
    return await MovieModel.destroy({
        where: {
            id: movieId,
        },
    });
}
export async function getMovie(movieId: number) {
    const movie = await MovieModel.findOne({
        where: {
            id: movieId,
        },
    });
    return movie ? movie.toJSON() : null;
}
