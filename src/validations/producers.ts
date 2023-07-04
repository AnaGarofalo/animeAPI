import {
  FullProducerInfo,
  ProducerErrors,
  ProducerInfo,
  ProducersTitlesTypes,
} from "../types";
import { isString } from "./generals";

export const isFullProducerInfo = (info: any): Boolean => {
  const { title, japaneseTitle, image, about, _id, id } = info;
  const requiredStrings = [title, japaneseTitle, image, about];

  if (!requiredStrings.every((string) => isString(string) && !!string))
    return false;

  if ((!id && !_id) || (!isString(id) && !isString(_id))) return false;

  return true;
};

export const validatedProducerInfoFromApi = (info: any): ProducerInfo => {
  let { titles, images, about } = info;
  let defaultTitle: String = "";
  let japaneseTitle: String = "";

  for (const title of titles) {
    if (!isString(title.title))
      throw new Error(ProducerErrors.InvalidProducerInfo);

    if (title.type === ProducersTitlesTypes.Default) defaultTitle = title.title;
    if (title.type === ProducersTitlesTypes.Japanese)
      japaneseTitle = title.title;
  }

  if (!about || !about.length) about = "Description not avaible";
  if (!isString(images.jpg.image_url) || !isString(about))
    throw new Error(ProducerErrors.InvalidProducerInfo);

  const finalInfo: ProducerInfo = {
    title: defaultTitle,
    japaneseTitle: japaneseTitle,
    image: images.jpg.image_url,
    about,
  };
  return finalInfo;
};

export const validatedProducerInfoFromApiArray = (arr: any): ProducerInfo[] => {
  if (!Array.isArray(arr)) throw new Error(ProducerErrors.InvalidProducerInfo);
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
    id: id ? id : _id,
  };
};

export const validatedFullProducerInfoArray = (
  arr: any
): Array<FullProducerInfo> => {
  if (!Array.isArray(arr)) throw new Error(ProducerErrors.InvalidProducerInfo);
  return arr.map((obj) => validatedFullProducerInfo(obj));
};
