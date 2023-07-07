import { isObjectIdOrHexString } from "mongoose";
import { GeneralErrors } from "../types";

export const isString = (string: any): Boolean => {
  return (
    (typeof string === "string" || string instanceof String) &&
    string.length > 0
  );
};

export const validatedMongoId = (id: any): String => {
  if (!isObjectIdOrHexString(id)) throw new Error(GeneralErrors.InvalidId);
  return id;
};

export const validatedCasesSring = (string: String) => {
  return string[0].toUpperCase() + string.slice(1, string.length).toLowerCase();
};
