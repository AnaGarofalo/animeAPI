import { isObjectIdOrHexString } from "mongoose";
import {
  FullProducerInfo,
  GeneralErrors,
  MinProducerInfo,
  ProducerErrors,
  ProducerInfo,
  ProducerInfoForUpdate,
  ProducersTitlesTypes,
} from "../types";
import { isString, validatedCasesSring } from "./generals";
import Producer from "../database/models/producers";

export const isFullProducerInfo = (info: any): Boolean => {
  const { title, japaneseTitle, image, about, _id, id } = info;
  const requiredStrings = [title, japaneseTitle, image, about];

  if (!requiredStrings.every((string) => isString(string) && !!string)) {
    return false;
  }

  if (
    (!id && !_id) ||
    (!isObjectIdOrHexString(id) && !isObjectIdOrHexString(_id))
  )
    throw new Error(GeneralErrors.InvalidId);

  return true;
};

export const isProducerInfo = (info: any): Boolean => {
  const { title, japaneseTitle, image, about } = info;
  const requiredStrings = [title, japaneseTitle, image, about];

  if (!requiredStrings.every((string) => isString(string) && !!string)) {
    return false;
  }
  return true;
};

export const alredyExists = async (title: String): Promise<Boolean> => {
  const oldProducer = await Producer.findOne({ title });
  if (oldProducer) return true;
  return false;
};

export const validatedProducerInfoFromApi = (info: any): ProducerInfo => {
  let { titles, images, about } = info;
  let defaultTitle: String = "";
  let japaneseTitle: String = "";

  for (const title of titles) {
    if (typeof title.title !== "string")
      throw new Error(ProducerErrors.InvalidProducerTitle);

    if (title.type === ProducersTitlesTypes.Default) defaultTitle = title.title;
    if (title.type === ProducersTitlesTypes.Japanese)
      japaneseTitle = title.title;
  }

  if (!about || !about.length) about = "Description not avaible";
  if (!isString(images.jpg.image_url))
    throw new Error(ProducerErrors.InvalidProducerImage);
  if (!isString(about)) throw new Error(ProducerErrors.InvalidProducerAbout);

  const finalInfo: ProducerInfo = {
    title: defaultTitle,
    japaneseTitle: japaneseTitle.length ? japaneseTitle : "Not Avaible",
    image: images.jpg.image_url,
    about,
  };
  return finalInfo;
};

export const validatedProducerInfoFromApiArray = (arr: any): ProducerInfo[] => {
  if (!Array.isArray(arr)) throw new Error(GeneralErrors.ExpectedArray);
  const finalArray = arr.map((obj: any) => validatedProducerInfoFromApi(obj));
  return finalArray;
};

export const validatedFullProducerInfo = (info: any): FullProducerInfo => {
  if (!isFullProducerInfo(info))
    throw new Error(ProducerErrors.InvalidProducerInfo);
  const { title, japaneseTitle, image, about, _id, id } = info;

  return {
    title,
    japaneseTitle,
    image,
    about,
    id: id ? id : String(_id),
  };
};

export const validatedFullProducerInfoArray = (
  arr: any
): Array<FullProducerInfo> => {
  if (!Array.isArray(arr)) throw new Error(GeneralErrors.ExpectedArray);
  return arr.map((obj) => validatedFullProducerInfo(obj));
};

export const validatedProducerInfo = (info: any): ProducerInfo => {
  if (!isProducerInfo(info))
    throw new Error(ProducerErrors.InvalidProducerInfo);
  return {
    title: validatedCasesSring(info.title),
    japaneseTitle: validatedCasesSring(info.japaneseTitle),
    image: info.image,
    about: validatedCasesSring(info.about),
  };
};

export const validatedMinProducerInfo = (info: any): MinProducerInfo => {
  const { title, id, _id } = info;

  if (
    (!id && !_id) ||
    (!isObjectIdOrHexString(id) && !isObjectIdOrHexString(_id))
  )
    throw new Error(GeneralErrors.InvalidId);

  if (!title || !isString(title))
    throw new Error(ProducerErrors.InvalidProducerTitle);

  return {
    id: id ? id : String(_id),
    title: title,
  };
};

export const validatedMinProducerInfoArray = (
  arr: any
): Array<MinProducerInfo> => {
  if (!Array.isArray(arr)) throw new Error(GeneralErrors.ExpectedArray);
  return arr.map((obj) => validatedMinProducerInfo(obj));
};

export const validatedProducerInfoForUpdate = (
  id: any,
  info: any
): ProducerInfoForUpdate => {
  const { title, japaneseTitle, about, image } = info;

  const producerInfoForUpdate: ProducerInfoForUpdate = {};
  if (isString(title)) producerInfoForUpdate.title = title;
  if (isString(japaneseTitle))
    producerInfoForUpdate.japaneseTitle = japaneseTitle;
  if (isString(about)) producerInfoForUpdate.about = about;
  if (isString(image)) producerInfoForUpdate.image = image;

  if (!Object.values(producerInfoForUpdate).length)
    throw new Error(ProducerErrors.InvalidProducerInfo);

  if (!isObjectIdOrHexString(id)) throw new Error(GeneralErrors.InvalidId);
  return producerInfoForUpdate;
};
