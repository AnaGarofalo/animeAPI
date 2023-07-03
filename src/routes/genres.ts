import { Router } from "express";
import { getFromAPI, getFromDB } from "../services/genres";
import { GenreFromDB } from "../types";

const genresRouter = Router();

genresRouter.get("/getFromAPI", async (req, res) => {
  try {
    const success: Boolean = await getFromAPI();
    res.status(success ? 201 : 400).json({ success });
  } catch (error) {
    res.status(500).json({ succes: false });
  }
});

genresRouter.get("/", async (req, res) => {
  try {
    const genres: Array<GenreFromDB> = await getFromDB();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default genresRouter;
