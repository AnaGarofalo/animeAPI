import { Router } from "express";
import {
  getFromAPI,
  getFromDB,
  postGenre,
  updateGenre,
} from "../services/genres";
import { GenreErrors, fullGenreInfo } from "../types";
import { disconnectDB } from "../database/db";
import { isString } from "../validations/generals";
import { errorHandler } from "../utils/errorHandler";

const genresRouter = Router();

genresRouter.get("/getFromAPI", async (req, res, next) => {
  try {
    const success: Boolean = await getFromAPI();
    res.status(success ? 201 : 400).json({ success });
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

genresRouter.get("/", async (req, res, next) => {
  try {
    const genres: Array<fullGenreInfo> = await getFromDB();
    res.status(200).json(genres);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

genresRouter.post("/", async (req, res, next) => {
  try {
    const newGenre = await postGenre(req.body);
    res.status(201).json(newGenre);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

genresRouter.put("/:genreId", async (req, res, next) => {
  try {
    const { genreId } = req.params;
    const updatedGenre = await updateGenre(genreId, req.body);
    res.status(200).json(updatedGenre);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

export default genresRouter;
