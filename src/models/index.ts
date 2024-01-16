export interface User {
    id: string; // uuid
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}

export interface MovieCreatePayload {
    title: string;
    poster: string;
    year: number;
}

export interface Movie extends MovieCreatePayload {
    id: number;
}
