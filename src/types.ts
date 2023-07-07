//? ANIME

import mongoose, { ObjectId } from "mongoose";

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
  genres: Array<GenresForAnimeCards>;
  producers: Array<ProducersForAnimeCards>;
}

export interface AnimeForDB extends Omit<Anime, "id"> {
  genres: Array<mongoose.Types.ObjectId>;
  producers: Array<mongoose.Types.ObjectId>;
}

// export interface AnimeFromAPI extends Omit<Anime, "id"> {
//   genres: Array<mongoose.Types.ObjectId | null>;
//   producers: Array<mongoose.Types.ObjectId | null>;
//   rating: String;
// }

export type AnimeForCards = Pick<
  AnimeDetail,
  "id" | "title" | "score" | "genres" | "producers" | "image"
>;
export type GenresForAnimeCards = {
  id: String;
  name: String;
};

export type ProducersForAnimeCards = {
  id: String;
  title: String;
};

export enum Status {
  Airing = "Currently Airing",
  Finished = "Finished Airing",
}

export interface Aired {
  from: Date;
  to: Date | null;
}

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

export interface ProducerInfoForUpdate {
  title?: String;
  japaneseTitle?: String;
  image?: String;
  about?: String;
}

export type MinProducerInfo = Pick<FullProducerInfo, "id" | "title">;

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
  ExpectedArray = "An Array was expected",
}

export enum GenreErrors {
  InvalidGenreInfo = "Invalid genre info",
  InvalidGenreName = "Invalid genre name",
  ServerError = "Server error",
  NotFound = "Genre not found",
  AlredyExists = "Genre alredy exists",
}

export enum ProducerErrors {
  InvalidProducerInfo = "Invalid producer info",
  InvalidProducerTitle = "Invalid Producer Title",
  InvalidProducerImage = "Invalid Producer Image",
  InvalidProducerAbout = "Invalid Producer About",
  ServerError = "Server error",
  NotFound = "Producer not found",
  AlredyExists = "Producer alredy exists",
}

export enum AnimeErrors {
  InvalidAnimeInfo = "Invalid Anime Info",
  InvalidTitle = "Invalid Anime Title",
  InvalidEpisodes = "Invalid Anime Episodes",
  InvalidAired = "Invalid Anime Airing Period",
  InvalidStatus = "Invalid Status",
  InvalidScore = "Invalid Score",
  InvalidGenre = "Invalid Anime Genre",
  InvalidProducer = "Invalid Anime Producer",
  NotFound = "Anime Not Found",
  AlredyExists = "Anime alredy exists",
}

//ATP RULES
export enum noATPGenres {
  Ecchi = "Ecchi",
  Erotica = "Erotica",
  Hentai = "Hentai",
  AdultCast = "Adult Cast",
}
