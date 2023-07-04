import { disconnectDB } from "../database/db";
import { GeneralErrors, GenreErrors, ProducerErrors } from "../types";

export const errorHandler = async (
  errorMessage: String,
  res: any
): Promise<void> => {
  await disconnectDB();
  switch (errorMessage) {
    //*Genre Errors
    case GenreErrors.InvalidGenreInfo:
      res.status(400).json({ error: errorMessage });
      break;
    case GenreErrors.NotFound:
      res.status(404).json({ error: errorMessage });
      break;

    //*Producer Error
    case ProducerErrors.InvalidProducerInfo:
      res.status(400).json({ error: errorMessage });
      break;
    case ProducerErrors.NotFound:
      res.status(404).json({ error: errorMessage });
      break;

    //*General Errors
    case GeneralErrors.InvalidId:
      res.status(404).json({ error: errorMessage });
      break;

    //* Server Error
    default:
      res.status(500).json({ error: errorMessage });
      break;
  }
};
