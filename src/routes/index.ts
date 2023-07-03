import express from "express";
import genresRouter from "./genres";

const mainRouter = express.Router();

mainRouter.use("/genres", genresRouter);

export default mainRouter;
