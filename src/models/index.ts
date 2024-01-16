export interface User {
    id: string; // uuid
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    movies?: Movie[]
}

export interface Movie {
    id: number;
    title: string,
    poster: string
    userId: string
    year: number
}
