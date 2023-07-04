//? ANIME

export interface Anime {
  id: String;
  title: String;
  japaneseTitle: String;
  episodes: Number;
  status: Status;
  score: Number;
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
  to: Date;
};

//? PRODUCER

export interface ProducerInfo {
  title: String;
  japaneseTitle: String;
}

export interface ProducerFromDB extends ProducerInfo {
  id: String;
}

//? GENRE

export interface GenreInfo {
  name: String;
}

export interface fullGenreInfo extends GenreInfo {
  id: String;
}

export enum GenreErrors {
  InvalidGenreInfo = "Invalid genre info",
  ServerError = "Server error",
}
