import axios from "axios";
import {
  FullProducerInfo,
  GeneralErrors,
  ProducerErrors,
  ProducerInfo,
} from "../types";
import { API_URL_BASE } from "../utils/apiUrl";
import {
  alredyExists,
  validatedFullProducerInfo,
  validatedFullProducerInfoArray,
  validatedMinProducerInfoArray,
  validatedProducerInfo,
  validatedProducerInfoForUpdate,
  validatedProducerInfoFromApiArray,
} from "../validations/producers";
import { disconnectDB } from "../database/db";
import Producer from "../database/models/producers";
import { isObjectIdOrHexString } from "mongoose";

export const getProducersFromApi = async (): Promise<Array<ProducerInfo>> => {
  const response = await axios.get(`${API_URL_BASE}/producers`);
  const producers = validatedProducerInfoFromApiArray(response.data.data);
  const newProducers = await Producer.insertMany(producers);
  await disconnectDB();
  return validatedFullProducerInfoArray(newProducers);
};

export const getAllFullProducersInfo = async () => {
  const response = await Producer.find();
  const producers = validatedFullProducerInfoArray(response);
  await disconnectDB();
  return producers;
};

export const getAllMinProducersInfo = async () => {
  const response = await Producer.find();
  const producers = validatedMinProducerInfoArray(response);
  await disconnectDB();
  return producers;
};

export const getProducerById = async (id: any): Promise<FullProducerInfo> => {
  if (!isObjectIdOrHexString(id)) throw new Error(GeneralErrors.InvalidId);
  const info = await Producer.findById(id);
  if (!info) throw new Error(ProducerErrors.NotFound);
  const producer = validatedFullProducerInfo(info);
  await disconnectDB();
  return producer;
};

export const createProducer = async (info: any): Promise<FullProducerInfo> => {
  const producer = validatedProducerInfo(info);
  if (await alredyExists(producer.title))
    throw Error(ProducerErrors.AlredyExists);
  const createdProducer = await Producer.create(producer);
  await disconnectDB();
  return validatedFullProducerInfo(createdProducer);
};

export const updateProducer = async (
  id: any,
  info: any
): Promise<FullProducerInfo> => {
  const producer = validatedProducerInfoForUpdate(id, info);
  const updatedProducer = await Producer.findByIdAndUpdate(id, producer, {
    new: true,
  });
  if (!updatedProducer) throw new Error(ProducerErrors.NotFound);
  await disconnectDB();
  return validatedFullProducerInfo(updatedProducer);
};

export const deleteProducer = async (id: any): Promise<FullProducerInfo> => {
  if (!isObjectIdOrHexString(id)) throw new Error(GeneralErrors.InvalidId);
  const deleted = await Producer.findByIdAndDelete(id);
  if (!deleted) throw new Error(ProducerErrors.NotFound);
  await disconnectDB();
  return validatedFullProducerInfo(deleted);
};
