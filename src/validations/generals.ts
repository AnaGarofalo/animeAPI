import { GeneralErrors } from "../types";

export const isString = (string: any): Boolean => {
  return (
    (typeof string === "string" || string instanceof String) &&
    string.length > 0
  );
};

export const validatedMongoId = (id: any): String => {
  if (!isString(id) || id.length !== 24)
    throw new Error(GeneralErrors.InvalidId);
  return id;
};
