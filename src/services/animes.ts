import axios from "axios";
import { API_URL_BASE } from "../utils/apiUrl";
import {
  validateAnimeArrayFromApi,
  validatedAnimeDetailArrayFromDB,
  validatedAnimeDetailFromDB,
  validatedAnimeForCardsArray,
  validatedAnimeForDB,
} from "../validations/animes";
import Anime from "../database/models/animes";
import {
  AnimeDetail,
  AnimeErrors,
  AnimeForCards,
  GeneralErrors,
} from "../types";
import { isString, validatedMongoId } from "../validations/generals";
import { isValidObjectId } from "mongoose";

export const getFromAPI = async (): Promise<AnimeDetail[]> => {
  const response = await axios.get(`${API_URL_BASE}/anime`);
  const animes = await validateAnimeArrayFromApi(response.data.data);
  await Anime.insertMany(animes);
  const newAnimes = await Anime.find({}).populate([
    { path: "genres", select: "name" },
    { path: "producers", select: "title" },
  ]);
  return validatedAnimeDetailArrayFromDB(newAnimes);
};

export const getAll = async (): Promise<AnimeForCards[]> => {
  const response = await Anime.find({}).populate([
    { path: "genres", select: "name" },
    { path: "producers", select: "title" },
  ]);
  return validatedAnimeForCardsArray(response);
};

export const getDetail = async (id: any): Promise<AnimeDetail> => {
  const response = await Anime.findById(validatedMongoId(id)).populate([
    { path: "genres", select: "name" },
    { path: "producers", select: "title" },
  ]);
  if (!response) throw new Error(AnimeErrors.NotFound);
  return validatedAnimeDetailFromDB(response);
};

export const createAnime = async (anime: any): Promise<AnimeDetail> => {
  const animeInfo = await validatedAnimeForDB(anime);
  const newAnime = await Anime.create(animeInfo);
  const created = await Anime.findById(newAnime._id).populate([
    { path: "genres", select: "name" },
    { path: "producers", select: "title" },
  ]);
  return validatedAnimeDetailFromDB(created);
};

export const deleteAnime = async (animeId: any) => {
  const id = validatedMongoId(animeId);
  const deletedAnime = await Anime.findByIdAndRemove(id);
  if (!deletedAnime) throw new Error(AnimeErrors.NotFound);
  return deletedAnime;
};
