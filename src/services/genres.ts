import axios from "axios";
import mongoose from "mongoose";
import { API_URL_BASE } from "../utils/apiUrl";
import { GenreInfo, GenreFromDB } from "../types";
import Genre from "../database/models/genres";

export const getFromAPI = async (): Promise<Boolean> => {
  const response = await axios.get(`${API_URL_BASE}/genres/anime`);
  const genresForDB: Array<GenreInfo> = response.data.data.map(
    ({ name }: { name: String }) => {
      return { name };
    }
  );

  await Genre.insertMany(genresForDB);

  mongoose.connection.close();
  return true;
};

export const getFromDB = async (): Promise<GenreFromDB[]> => {
  const response = await Genre.find();
  const genresFromDB: GenreFromDB[] = response.map(
    ({ _id, name }: { _id: object; name: String }): GenreFromDB => {
      return {
        id: String(_id),
        name,
      };
    }
  );

  mongoose.connection.close();
  return genresFromDB;
};
