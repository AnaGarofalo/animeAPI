import { Schema, model } from "mongoose";
import { ProducerInfo } from "../../types";

//* Mongoose te da la estructura que Mongo no tiene
const producerSchema = new Schema<ProducerInfo>({
  title: String,
  japaneseTitle: String,
  image: String,
  about: String,
});

//* El modelo es como una clase
// el nombre del modelo lo va a pasar a minúscula y plural
const Producer = model<ProducerInfo>("Producer", producerSchema);

export default Producer;
