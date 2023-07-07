import { Schema, Types, model } from "mongoose";
import { Status } from "../../types";

//* Mongoose te da la estructura que Mongo no tiene
const animeSchema = new Schema<any>({
  title: String,
  japaneseTitle: String,
  episodes: Number,
  status: { type: String, enum: Status },
  score: Number,
  scoredBy: Number,
  sinopsis: String,
  aired: { from: Date, to: Date },
  image: String,
  genres: [{ type: Types.ObjectId, ref: "Genre" }],
  producers: [{ type: Types.ObjectId, ref: "Producer" }],
});

//* El modelo es como una clase
// el nombre del modelo lo va a pasar a minúscula y plural en la bdd
const Anime = model<any>("Anime", animeSchema);

export default Anime;
