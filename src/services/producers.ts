import axios from "axios";
import { ProducerInfo } from "../types";
import { API_URL_BASE } from "../utils/apiUrl";
import {
  validatedFullProducerInfoArray,
  validatedProducerInfoFromApiArray,
} from "../validations/producers";
import { disconnectDB } from "../database/db";
import Producer from "../database/models/producers";

export const getProducersFromApi = async (): Promise<Array<ProducerInfo>> => {
  const response = await axios.get(`${API_URL_BASE}/producers`);
  const producers = validatedProducerInfoFromApiArray(response.data.data);
  const newProducers = await Producer.insertMany(producers);
  await disconnectDB();
  return validatedFullProducerInfoArray(newProducers);
};
