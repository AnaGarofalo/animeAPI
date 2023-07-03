import { Schema, model } from "mongoose";
import { GenreInfo } from "../../types";

//* Mongoose te da la estructura que Mongo no tiene
const genreSchema = new Schema<GenreInfo>({
  name: { type: String, required: true },
});

//* El modelo es como una clase
// el nombre del modelo lo va a pasar a minúscula y plural
const Genre = model<GenreInfo>("Genre", genreSchema);

export default Genre;
