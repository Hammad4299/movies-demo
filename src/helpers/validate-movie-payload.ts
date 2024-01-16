import { MovieCreatePayload } from "@/models";

export const validateMoviePayload = (param: MovieCreatePayload): boolean => {
    const keys: (keyof MovieCreatePayload)[] = ["poster", "title", "year"];
    const allKeysPresent = keys.every((key) => param[key]);
    if (!allKeysPresent) {
        return false;
    }
    const year = param.year;
    if (year.toString().length !== 4) {
        return false;
    }
    return true;
};
