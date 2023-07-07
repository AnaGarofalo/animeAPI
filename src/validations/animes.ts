import mongoose from "mongoose";
import Genre from "../database/models/genres";
import Producer from "../database/models/producers";
import {
  AnimeErrors,
  AnimeForDB,
  GeneralErrors,
  Status,
  noATPGenres,
  AnimeDetail,
  GenreErrors,
  ProducerErrors,
  AnimeForCards,
} from "../types";
import { isString } from "./generals";
import Anime from "../database/models/animes";

export const validatedAnimeFromApi = async (
  data: any
): Promise<AnimeForDB | undefined> => {
  const {
    title,
    title_japanese,
    episodes,
    status,
    score,
    scored_by,
    synopsis,
    aired,
    images,
    genres,
    producers,
    rating,
  } = data;
  if (rating.includes("18")) return undefined;

  if (!isString(title)) throw new Error(AnimeErrors.InvalidTitle);

  if (!isString(status) || !Object.values(Status).includes(status))
    throw new Error(AnimeErrors.InvalidStatus);
  if (typeof score !== "number" || typeof scored_by !== "number")
    throw new Error(AnimeErrors.InvalidScore);

  const japaneseTitle = isString(title_japanese)
    ? title_japanese
    : "Not avaible";
  const newSynopsis = isString(synopsis) ? synopsis : "Not avaible";

  if (
    !isString(aired.from) ||
    new Date(aired.from).toString() === "Invalid Date"
  )
    throw new Error(AnimeErrors.InvalidAired);
  const airedFrom = new Date(aired.from);
  if (aired.to !== null && new Date(aired.to).toString() === "Invalid Date")
    throw new Error(AnimeErrors.InvalidAired);
  const airedTo = aired.to ? new Date(aired.to) : null;

  const newImage = isString(images.jpg.image_url)
    ? images.jpg?.image_url
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkZBy8k1YnTUpnI_pYTScZBWmVlGY9xg1SdOdqQcWMo9R2YG9iIK1XBUXQV-Xb1Mb0V_k&usqp=CAU";

  if (!Array.isArray(genres)) throw new Error(GeneralErrors.ExpectedArray);
  const invalidGenres = genres.filter(({ name }) =>
    Object.values(noATPGenres).includes(name)
  );
  if (invalidGenres.length) return undefined;

  const promises = genres.map(async ({ name }) => {
    const genre = await Genre.findOne({ name });
    if (!genre) {
      const newGenre = await Genre.create({ name });
      return newGenre._id;
    } else return genre._id;
  });
  const newGenres = await Promise.all(promises);

  if (!Array.isArray(producers)) throw new Error(GeneralErrors.ExpectedArray);
  const promisesProducers = producers.map(async ({ name }) => {
    const prod = await Producer.findOne({ title: name });
    if (!prod) {
      return null;
    } else return prod._id;
  });
  const newProducers = await Promise.all(promisesProducers);
  const filteredProducers = newProducers.filter((prod) => prod !== null);
  if (filteredProducers.includes(null))
    throw new Error(AnimeErrors.InvalidProducer);

  return {
    title,
    japaneseTitle,
    episodes:
      typeof episodes !== "number" || Math.floor(episodes) !== episodes
        ? 0
        : episodes,
    score,
    status,
    scoredBy: scored_by,
    aired: { from: airedFrom, to: airedTo },
    sinopsis: newSynopsis,
    image: newImage,
    genres: newGenres,
    producers: filteredProducers as mongoose.Types.ObjectId[],
  };
};

export const validateAnimeArrayFromApi = async (
  arr: any
): Promise<AnimeForDB[]> => {
  if (!Array.isArray(arr)) throw new Error(GeneralErrors.ExpectedArray);

  const finalArray = [];
  for (const obj of arr) {
    const anime = await validatedAnimeFromApi(obj);
    if (anime !== undefined) finalArray.push(anime);
  }

  return finalArray as AnimeForDB[];
};

export const validatedAnimeDetailFromDB = (anime: any): AnimeDetail => {
  const {
    _id,
    title,
    japaneseTitle,
    episodes,
    status,
    score,
    scoredBy,
    sinopsis,
    aired,
    image,
    genres,
    producers,
  } = anime;
  const strings = [title, japaneseTitle, status, sinopsis, image];
  if (!strings.every(isString)) throw new Error(AnimeErrors.InvalidAnimeInfo);
  if (!(_id instanceof mongoose.Types.ObjectId))
    throw new Error(GeneralErrors.InvalidId);
  if (typeof episodes !== "number" || Math.floor(episodes) !== episodes)
    throw new Error(AnimeErrors.InvalidEpisodes);
  if (typeof score !== "number" || typeof scoredBy !== "number")
    throw new Error(AnimeErrors.InvalidScore);
  if (!aired.from || !(aired.from instanceof Date))
    throw new Error(AnimeErrors.InvalidAired);
  if (aired.to && !(aired.to instanceof Date))
    throw new Error(AnimeErrors.InvalidAired);
  if (!Object.values(Status).includes(status))
    throw new Error(AnimeErrors.InvalidStatus);
  for (const genre of genres) {
    if (!genre._id || !(genre._id instanceof mongoose.Types.ObjectId))
      throw new Error(GenreErrors.InvalidGenreInfo);
    if (!isString(genre.name)) throw new Error(GenreErrors.InvalidGenreInfo);
  }
  for (const producer of producers) {
    if (!producer._id || !(producer._id instanceof mongoose.Types.ObjectId))
      throw new Error(ProducerErrors.InvalidProducerInfo);
    if (!isString(producer.title))
      throw new Error(ProducerErrors.InvalidProducerInfo);
  }

  return {
    id: String(_id),
    title,
    japaneseTitle,
    status,
    sinopsis,
    image,
    episodes,
    score,
    scoredBy,
    aired,
    genres: genres.map((gen: any) => {
      return { id: String(gen._id), name: gen.name };
    }),
    producers: producers.map((prod: any) => {
      return { id: String(prod._id), title: prod.title };
    }),
  };
};

export const validatedAnimeDetailArrayFromDB = (arr: any): AnimeDetail[] => {
  if (!Array.isArray(arr)) throw new Error(GeneralErrors.ExpectedArray);
  return arr.map((obj) => validatedAnimeDetailFromDB(obj));
};

export const validatedAnimeForCards = (anime: any): AnimeForCards => {
  const { _id, title, japaneseTitle, score, image, genres, producers } = anime;
  const strings = [title, japaneseTitle, image];
  if (!strings.every(isString)) throw new Error(AnimeErrors.InvalidAnimeInfo);
  if (!(_id instanceof mongoose.Types.ObjectId))
    throw new Error(GeneralErrors.InvalidId);

  for (const genre of genres) {
    if (!genre._id || !(genre._id instanceof mongoose.Types.ObjectId))
      throw new Error(GenreErrors.InvalidGenreInfo);
    if (!isString(genre.name)) throw new Error(GenreErrors.InvalidGenreInfo);
  }
  for (const producer of producers) {
    if (!producer._id || !(producer._id instanceof mongoose.Types.ObjectId))
      throw new Error(ProducerErrors.InvalidProducerInfo);
    if (!isString(producer.title))
      throw new Error(ProducerErrors.InvalidProducerInfo);
  }

  return {
    id: String(_id),
    title,
    score,
    image,
    genres: genres.map((gen: any) => {
      return { id: String(gen._id), name: gen.name };
    }),
    producers: producers.map((prod: any) => {
      return { id: String(prod._id), title: prod.title };
    }),
  };
};

export const validatedAnimeForCardsArray = (arr: any): Array<AnimeForCards> => {
  if (!Array.isArray(arr)) throw new Error(GeneralErrors.ExpectedArray);
  return arr.map((obj) => validatedAnimeForCards(obj));
};

export const validatedAnimeForDB = async (anime: any): Promise<AnimeForDB> => {
  const {
    title,
    japaneseTitle,
    episodes,
    status,
    score,
    scoredBy,
    sinopsis,
    aired,
    image,
    genres,
    producers,
  } = anime;
  const strings = [title, japaneseTitle, status, sinopsis, image];
  if (!strings.every(isString)) throw new Error(AnimeErrors.InvalidAnimeInfo);

  const oldAnime = await Anime.findOne({ title: title });
  if (oldAnime) throw new Error(AnimeErrors.AlredyExists);

  if (typeof episodes !== "number" || Math.floor(episodes) !== episodes)
    throw new Error(AnimeErrors.InvalidEpisodes);
  if (typeof score !== "number" || typeof scoredBy !== "number")
    throw new Error(AnimeErrors.InvalidScore);

  if (
    !isString(aired.from) ||
    new Date(aired.from).toString() === "Invalid Date"
  )
    throw new Error(AnimeErrors.InvalidAired);
  const airedFrom = new Date(aired.from);
  if (aired.to !== null && new Date(aired.to).toString() === "Invalid Date")
    throw new Error(AnimeErrors.InvalidAired);
  const airedTo = aired.to ? new Date(aired.to) : null;

  if (!Object.values(Status).includes(status))
    throw new Error(AnimeErrors.InvalidStatus);

  for (const genre of genres) {
    if (!isString(genre)) throw new Error(GenreErrors.InvalidGenreInfo);
  }
  for (const producer of producers) {
    if (!isString(producer))
      throw new Error(ProducerErrors.InvalidProducerInfo);
  }

  if (!Array.isArray(genres)) throw new Error(GeneralErrors.ExpectedArray);

  const promises = genres.map(async (name) => {
    const genre = await Genre.findOne({ name: name });
    if (!genre) {
      const newGenre = await Genre.create({ name: name });
      return newGenre._id;
    } else return genre._id;
  });
  const newGenres = await Promise.all(promises);

  if (!Array.isArray(producers)) throw new Error(GeneralErrors.ExpectedArray);
  const promisesProducers = producers.map(async (title) => {
    const prod = await Producer.findOne({ title: title });
    if (!prod) {
      throw new Error(ProducerErrors.InvalidProducerTitle);
    } else return prod._id;
  });
  const newProducers = await Promise.all(promisesProducers);

  return {
    title,
    japaneseTitle,
    status,
    sinopsis,
    image,
    episodes,
    score,
    scoredBy,
    aired: { from: airedFrom, to: airedTo },
    genres: newGenres,
    producers: newProducers,
  };
};
