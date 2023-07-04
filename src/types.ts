//? ANIME

export interface Anime {
  id: String;
  title: String;
  japaneseTitle: String;
  episodes: Number;
  status: Status;
  score: Number;
  scoredBy: Number;
  sinopsis: String;
  aired: Aired;
  image: String;
}

export interface AnimeDetail extends Anime {
  genres: Array<String>;
  producers: Array<String>;
}

export type AnimeForCards = Pick<
  AnimeDetail,
  "title" | "score" | "genres" | "producers" | "image"
>;

export type AnimeForDB = Omit<AnimeDetail, "id">;

export enum Status {
  Airing = "Airing",
  Finished = "Finished",
}

export type Aired = {
  from: Date;
  to: Date | null;
};

//? PRODUCER

export interface ProducerInfo {
  title: String;
  japaneseTitle: String;
  image: String;
  about: String;
}

export interface FullProducerInfo extends ProducerInfo {
  id: String;
}

export enum ProducersTitlesTypes {
  Default = "Default",
  Japanese = "Japanese",
}

//? GENRE

export interface GenreInfo {
  name: String;
}

export interface fullGenreInfo extends GenreInfo {
  id: String;
}

//! Error strings
export enum GeneralErrors {
  InvalidId = "Invalid Id",
}

export enum GenreErrors {
  InvalidGenreInfo = "Invalid genre info",
  ServerError = "Server error",
  NotFound = "Genre not found",
}

export enum ProducerErrors {
  InvalidProducerInfo = "Invalid producer info",
  ServerError = "Server error",
  NotFound = "Producer not found",
}

//ATP RULES
export enum noATPGenres {
  Ecchi = "Ecchi",
  Erotica = "Erotica",
  Hentai = "Hentai",
  AdultCast = "Adult Cast",
}
