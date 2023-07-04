import axios from "axios";
import { API_URL_BASE } from "../utils/apiUrl";
import { GenreErrors, GenreInfo, fullGenreInfo } from "../types";
import Genre from "../database/models/genres";
import {
  validatedFullGenreInfo,
  validatedFullGenreInfoArray,
  validatedGenreInfo,
  validatedGenreInfoArray,
} from "../validations/genres";
import { disconnectDB } from "../database/db";
import { validatedMongoId } from "../validations/generals";

export const getFromAPI = async (): Promise<Boolean> => {
  const response = await axios.get(`${API_URL_BASE}/genres/anime`);
  const genresForDB: Array<GenreInfo> = validatedGenreInfoArray(
    response.data.data
  );

  await Genre.insertMany(genresForDB);
  await disconnectDB();
  return true;
};

export const getFromDB = async (): Promise<fullGenreInfo[]> => {
  const response = await Genre.find();
  const genres: fullGenreInfo[] = validatedFullGenreInfoArray(response);

  await disconnectDB();
  return genres;
};

export const postGenre = async (genre: any): Promise<fullGenreInfo> => {
  const genreInfo = validatedGenreInfo(genre);
  const newGenre = await Genre.create(genreInfo);

  await disconnectDB();
  return validatedFullGenreInfo(newGenre);
};

export const updateGenre = async (
  genreId: any,
  newInfo: any
): Promise<fullGenreInfo> => {
  const genreInfo = validatedGenreInfo(newInfo);
  const id = validatedMongoId(genreId);
  const updatedGenre = await Genre.findByIdAndUpdate(id, genreInfo, {
    new: true,
  });
  if (!updatedGenre) throw new Error(GenreErrors.NotFound);
  await disconnectDB();
  return validatedFullGenreInfo(updatedGenre);
};
