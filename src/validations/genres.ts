import { isString, validatedCasesSring } from "./generals";
import {
  GeneralErrors,
  GenreErrors,
  GenreInfo,
  fullGenreInfo,
  noATPGenres,
} from "../types";
import { isObjectIdOrHexString } from "mongoose";
import Genre from "../database/models/genres";

export const isGenreInfo = (genreInfo: any): Boolean => {
  return !genreInfo.name || !isString(genreInfo.name) ? false : true;
};

export const isFullGenreInfo = (fullGenreInfo: any): Boolean => {
  if (!fullGenreInfo.name || !isString(fullGenreInfo.name))
    throw new Error(GenreErrors.InvalidGenreName);
  if (!fullGenreInfo._id && !fullGenreInfo.id)
    throw new Error(GeneralErrors.InvalidId);
  if (
    !isObjectIdOrHexString(fullGenreInfo._id) &&
    !isObjectIdOrHexString(fullGenreInfo.id)
  )
    throw new Error(GeneralErrors.InvalidId);
  return true;
};

export const alredyExists = async (name: String): Promise<Boolean> => {
  const oldGenre = await Genre.findOne({ name });
  if (oldGenre) return true;
  return false;
};

export const validatedGenreInfo = (genreInfo: any): GenreInfo => {
  if (!genreInfo.name || !isString(genreInfo.name))
    throw new Error(GenreErrors.InvalidGenreName);
  return { name: validatedCasesSring(genreInfo.name) };
};

export const validatedGenreInfoArray = (
  genreInfoArray: any
): Array<GenreInfo> => {
  if (!Array.isArray(genreInfoArray) || !genreInfoArray.length)
    throw new Error(GeneralErrors.ExpectedArray);

  if (!genreInfoArray.every((obj: any) => isGenreInfo(obj)))
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
    id: obj._id ? String(obj._id) : obj.id,
    name: obj.name,
  };
};

export const validatedFullGenreInfoArray = (
  infoArray: any
): Array<fullGenreInfo> => {
  if (!Array.isArray(infoArray) || !infoArray.length)
    throw new Error(GeneralErrors.ExpectedArray);
  return infoArray.map((obj): fullGenreInfo => validatedFullGenreInfo(obj));
};
