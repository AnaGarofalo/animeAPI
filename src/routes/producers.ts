import { Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { isString } from "../validations/generals";
import {
  createProducer,
  deleteProducer,
  getAllFullProducersInfo,
  getAllMinProducersInfo,
  getProducerById,
  getProducersFromApi,
  updateProducer,
} from "../services/producers";

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

producersRouter.get("/full", async (req, res, next) => {
  try {
    const producers = await getAllFullProducersInfo();
    res.status(200).json(producers);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

producersRouter.get("/min", async (req, res, next) => {
  try {
    const producers = await getAllMinProducersInfo();
    res.status(200).json(producers);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

producersRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const producer = await getProducerById(id);
    res.status(200).json(producer);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

producersRouter.post("/", async (req, res, next) => {
  try {
    const info = req.body;
    const createdProducer = await createProducer(info);
    res.status(201).json(createdProducer);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

producersRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const info = req.body;
    const updated = await updateProducer(id, info);
    res.status(200).json(updated);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

producersRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteProducer(id);
    res.status(200).json(deleted);
  } catch (error: any) {
    if (!isString(error.message)) next(error);
    else errorHandler(error.message, res);
  }
});

export default producersRouter;
