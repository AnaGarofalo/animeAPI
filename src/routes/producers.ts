import { Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { isString } from "../validations/generals";
import { getProducersFromApi } from "../services/producers";

const producersRouter = Router();

producersRouter.get("/getFromApi", async (req, res, next) => {
  try {
    const producers = await getProducersFromApi();
    res.status(201).json(producers);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

export default producersRouter;
