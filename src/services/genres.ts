import axios from "axios";
import mongoose from "mongoose";
import { API_URL_BASE } from "../utils/apiUrl";
import { GenreInfo, fullGenreInfo } from "../types";
import Genre from "../database/models/genres";
import {
  validatedFullGenreInfoArray,
  validatedGenreInfoArray,
} from "../validations/genres";

export const getFromAPI = async (): Promise<Boolean> => {
  const response = await axios.get(`${API_URL_BASE}/genres/anime`);
  const genresForDB: Array<GenreInfo> = validatedGenreInfoArray(
    response.data.data
  );

  await Genre.insertMany(genresForDB);

  mongoose.connection.close();
  return true;
};

export const getFromDB = async (): Promise<fullGenreInfo[]> => {
  const response = await Genre.find();
  const genres: fullGenreInfo[] = validatedFullGenreInfoArray(response);

  mongoose.connection.close();
  return genres;
};
