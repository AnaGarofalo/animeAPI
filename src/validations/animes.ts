import { AnimeForDB } from "../types";

export const validatedAnimeForDB = (data: any): AnimeForDB | void => {
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
  } = data;
};

// export interface Anime {
//     id: String;
//     title: String;
//     japaneseTitle: String;
//     episodes: Number;
//     status: Status;
//     score: Number;
//     sinopsis: String;
//     aired: Aired;
//     image: String;
//   }

//   export interface AnimeDetail extends Anime {
//     genres: Array<String>;
//     producers: Array<String>;
//   }
