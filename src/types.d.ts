//? ANIME

export interface Anime {
  id: String;
  title: String;
  japaneseTitle: String;
  episodes: Number;
  airing: Boolean;
  score: Number;
  sinopsis: String;
  release: Number;
  images: String;
}

export interface AnimeDetail extends Anime {
  genres: Array<String>;
  producers: Array<String>;
}

export type AnimeForCards = Pick<
  Anime,
  "title" | "score" | "genres" | "themes" | "studios" | "image"
>;

export type AnimeForDB = Omit<AnimeDetail, id>;

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

export interface GenreFromDB extends GenreInfo {
  id: String;
}

//! Types for data from API ********************************************************************************/

//* Genres

export interface GenresFromAPI {
  data: GenreFromApi[];
}

export interface GenreFromApi {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

//* Producers

export interface ProducersFromAPI {
  pagination: Pagination;
  data: ProducerFromAPI[];
}

export interface ProducerFromAPI {
  mal_id: number;
  url: string;
  titles: Title[];
  images: Images;
  favorites: number;
  established: Date | null;
  about: null | string;
  count: number;
}

export interface Images {
  jpg: Jpg;
}

export interface Jpg {
  image_url: string;
}

export interface Title {
  type: Type;
  title: string;
}

export enum Type {
  Default = "Default",
  Japanese = "Japanese",
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}

//* Anime
export interface AnimesFromAPI {
  pagination: Pagination;
  data: AnimeFromAPI[];
}

export interface AnimeFromAPI {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: null | string;
  title_japanese: string;
  title_synonyms: string[];
  type: DatumType;
  source: Source;
  episodes: number | null;
  status: Status;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: Rating;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: null | string;
  season: Season | null;
  year: number | null;
  broadcast: Broadcast;
  producers: Demographic[];
  licensors: Demographic[];
  studios: Demographic[];
  genres: Demographic[];
  explicit_genres: any[];
  themes: Demographic[];
  demographics: Demographic[];
}

export interface Aired {
  from: Date;
  to: Date | null;
  prop: Prop;
  string: string;
}

export interface Prop {
  from: From;
  to: From;
}

export interface From {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface Broadcast {
  day: null | string;
  time: null | string;
  timezone: Timezone | null;
  string: null | string;
}

export enum Timezone {
  AsiaTokyo = "Asia/Tokyo",
}

export interface Demographic {
  mal_id: number;
  type: DemographicType;
  name: string;
  url: string;
}

export enum DemographicType {
  Anime = "anime",
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export enum Rating {
  PG13Teens13OrOlder = "PG-13 - Teens 13 or older",
  PGChildren = "PG - Children",
  R17ViolenceProfanity = "R - 17+ (violence & profanity)",
  RMildNudity = "R+ - Mild Nudity",
}

export enum Season {
  Fall = "fall",
  Spring = "spring",
  Summer = "summer",
}

export enum Source {
  LightNovel = "Light novel",
  Manga = "Manga",
  Original = "Original",
}

export enum Status {
  CurrentlyAiring = "Currently Airing",
  FinishedAiring = "Finished Airing",
}

export interface Title {
  type: TitleType;
  title: string;
}

export enum TitleType {
  Default = "Default",
  English = "English",
  French = "French",
  German = "German",
  Japanese = "Japanese",
  Spanish = "Spanish",
  Synonym = "Synonym",
}

export interface Trailer {
  youtube_id: null | string;
  url: null | string;
  embed_url: null | string;
  images: Images;
}

export interface Images {
  image_url: null | string;
  small_image_url: null | string;
  medium_image_url: null | string;
  large_image_url: null | string;
  maximum_image_url: null | string;
}

export enum DatumType {
  Movie = "Movie",
  Tv = "TV",
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}
