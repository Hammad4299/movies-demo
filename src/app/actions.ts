'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MovieModel from '@/db/models/MovieModel';
import { Movie } from '@/models';
import { PaginatedResponse, PaginationParam, getOffsetFromPagination, getPaginationMeta } from '@/types/pagination';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod'

const movSchema = {
    title: z.string({
        required_error: 'Title is required'
    }).min(2, { message: "Title can\'t be less than 2 characters" }),
    poster: z.string(),
    year: z.number().gte(1900, { message: 'Year must be greater than 1900.' }),
    userId: z.string().uuid()
};
const movieSchema = z.object({
    ...movSchema
});
const editMovieSchema = z.object({
    ...movSchema,
    id: z.number()
})

const PER_PAGE = 10;

export async function getUserMovies(page: number) {
    const session = await getServerSession(authOptions);

    // Return early if the form data is invalid
    if (session && session.user) {
        console.log('found session', session.user);

        const params: PaginationParam = { pageNumber: page, perPage: PER_PAGE };
        const movies = (await MovieModel.findAll({ where: { userId: (session.user as any).id }, limit: params.perPage, offset: getOffsetFromPagination(params) }));
        const totalCount = await MovieModel.count({ where: { userId: (session.user as any).id } });
        return {
            items: movies,
            paginationMeta: getPaginationMeta(params, { items: movies, total: totalCount })
        } as PaginatedResponse<Movie>
    }

    throw new Error('Not authorized');
}

export async function addMovie(formData: FormData) {
    const validatedFields = movieSchema.safeParse({
        title: formData.get('title'),
        poster: formData.get('poster'),
        year: formData.get('year'),
        userId: formData.get('userId'),
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Mutate data
    const newEntry = MovieModel.build({ ...validatedFields.data as Movie })

    await newEntry.save();
    return { data: newEntry }
}

export async function updateMovie(formData: FormData) {
    const validatedFields = editMovieSchema.safeParse({
        id: formData.get('id'),
        title: formData.get('title'),
        poster: formData.get('poster'),
        year: formData.get('year'),
        userId: formData.get('userId'),
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Mutate data

    // find old entry if any
    let row = await MovieModel.findOne({
        where: {
            id: validatedFields.data.id,
        },
    });
    if (row == null) {
        throw new Error('Movie does not exist.')
    }

    row.title = validatedFields.data.title;
    row.poster = validatedFields.data.poster;
    row.year = validatedFields.data.year;

    await row.save();

    return { data: row }
}

export async function deleteMovie(movieId: number) {
    return await MovieModel.destroy({
        where: {
            id: movieId,
        },
    });
}