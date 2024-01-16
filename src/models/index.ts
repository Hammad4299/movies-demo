export interface User {
    id: string; // uuid
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}

export interface Movie {
    id: number;
    title: string,
    poster: string
    year: number
}
