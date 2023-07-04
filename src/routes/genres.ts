import { Router } from "express";
import { getFromAPI, getFromDB } from "../services/genres";
import { GenreErrors, fullGenreInfo } from "../types";

const genresRouter = Router();

genresRouter.get("/getFromAPI", async (req, res, next) => {
  try {
    const success: Boolean = await getFromAPI();
    res.status(success ? 201 : 400).json({ success });
  } catch (error: any) {
    next(error.message);
  }
});

genresRouter.get("/", async (req, res, next) => {
  try {
    const genres: Array<fullGenreInfo> = await getFromDB();
    res.status(200).json(genres);
  } catch (error: any) {
    next(error.message);
  }
});

genresRouter.use((errorMessage: String, req: any, res: any) => {
  if (errorMessage === GenreErrors.InvalidGenreInfo)
    res.status(400).json({ error: errorMessage });
  else res.status(500).json({ error: errorMessage });
});

export default genresRouter;
