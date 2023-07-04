import { Router } from "express";
import {
  deleteGenre,
  getFromAPI,
  getFromDB,
  postGenre,
  updateGenre,
} from "../services/genres";
import { fullGenreInfo } from "../types";
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

genresRouter.delete("/:genreId", async (req, res, next) => {
  try {
    const { genreId } = req.params;
    const deletedGenre = await deleteGenre(genreId);
    res.status(200).json(deletedGenre);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

export default genresRouter;
