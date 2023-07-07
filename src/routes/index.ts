import express from "express";
import genresRouter from "./genres";
import producersRouter from "./producers";
import animeRouter from "./animes";

const mainRouter = express.Router();

mainRouter.use("/genres", genresRouter);

mainRouter.use("/producers", producersRouter);

mainRouter.use("/anime", animeRouter);

export default mainRouter;
