import { Router } from "express";
import {
  createAnime,
  deleteAnime,
  getAll,
  getDetail,
  getFromAPI,
} from "../services/animes";
import { AnimeDetail, AnimeForCards } from "../types";
import { isString } from "../validations/generals";
import { errorHandler } from "../utils/errorHandler";
import { disconnectDB } from "../database/db";

const animeRouter = Router();

animeRouter.get("/getFromApi", async (req, res, next) => {
  try {
    const animes: Array<AnimeDetail> = await getFromAPI();
    await disconnectDB();
    res.status(201).json(animes);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

animeRouter.get("/", async (req, res, next) => {
  try {
    const animes: Array<AnimeForCards> = await getAll();
    await disconnectDB();
    res.status(200).json(animes);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

animeRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime: AnimeDetail = await getDetail(id);
    await disconnectDB();
    res.status(200).json(anime);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

animeRouter.post("/", async (req, res, next) => {
  try {
    const info = req.body;
    const anime: AnimeDetail = await createAnime(info);
    await disconnectDB();
    res.status(201).json(anime);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

animeRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime: AnimeDetail = await deleteAnime(id);
    await disconnectDB();
    res.status(200).json(anime);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

export default animeRouter;
