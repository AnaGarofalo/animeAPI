import express from "express";
import genresRouter from "./genres";
import producersRouter from "./producers";

const mainRouter = express.Router();

mainRouter.use("/genres", genresRouter);

mainRouter.use("/producers", producersRouter);

export default mainRouter;
