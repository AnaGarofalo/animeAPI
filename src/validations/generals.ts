export const isString = (string: String): Boolean => {
  return (
    (typeof string === "string" || string instanceof String) &&
    string.length > 0
  );
};
