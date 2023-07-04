import { isString } from "./generals";
import { GenreErrors, GenreInfo, fullGenreInfo, noATPGenres } from "../types";

export const isGenreInfo = (genreInfo: any): Boolean => {
  return !genreInfo.name || !isString(genreInfo.name) ? false : true;
};

export const isFullGenreInfo = (fullGenreInfo: any): Boolean => {
  if (!fullGenreInfo.name || !isString(fullGenreInfo.name)) return false;
  if (!fullGenreInfo._id && !fullGenreInfo.id) return false;
  return true;
};

export const validatedCasesSring = (string: String) => {
  return string[0].toUpperCase() + string.slice(1, string.length).toLowerCase();
};

export const validatedGenreInfo = (genreInfo: any): GenreInfo => {
  if (!genreInfo.name || !isString(genreInfo.name))
    throw new Error(GenreErrors.InvalidGenreInfo);

  return { name: validatedCasesSring(genreInfo.name) };
};

export const validatedGenreInfoArray = (
  genreInfoArray: any
): Array<GenreInfo> => {
  if (
    !genreInfoArray.every((obj: any) => isGenreInfo(obj)) ||
    !Array.isArray(genreInfoArray) ||
    !genreInfoArray.length
  )
    throw new Error(GenreErrors.InvalidGenreInfo);

  const ATPGenres: Array<GenreInfo> = [];
  for (const genre of genreInfoArray) {
    if (!Object.values(noATPGenres).includes(genre.name))
      ATPGenres.push(validatedGenreInfo(genre));
  }
  return ATPGenres;
};

export const validatedFullGenreInfo = (obj: any): fullGenreInfo => {
  if (!isFullGenreInfo(obj)) throw new Error(GenreErrors.InvalidGenreInfo);
  return {
    id: obj._id ? obj._id : obj.id,
    name: obj.name,
  };
};

export const validatedFullGenreInfoArray = (
  infoArray: any
): Array<fullGenreInfo> => {
  if (!Array.isArray(infoArray) || !infoArray.length)
    throw new Error(GenreErrors.InvalidGenreInfo);
  return infoArray.map((obj): fullGenreInfo => validatedFullGenreInfo(obj));
};
