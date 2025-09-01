export type Episode = { number: number; title: string; url: string; duration: number };
export type Anime = {
  id: string; title: string; cover: string; status: "ongoing"|"completed";
  genres: string[]; sinopsis: string; popularity: number; year: number; episodes: Episode[];
};
