import type { Anime } from "./types";

export const GENRES = ["Action","Adventure","Comedy","Drama","Fantasy","Sci-Fi"] as const;

export const MOCK_ANIME: Anime[] = [
  {
    id: "a1",
    title: "Sky Blazers",
    cover: "https://picsum.photos/seed/a1/400/600",
    status: "ongoing",
    genres: ["Action","Adventure"],
    sinopsis: "Tim pilot muda menembus batas langit.",
    popularity: 98,
    year: 2025,
    episodes: [
      { number: 1, title: "Takeoff", url: "https://www.w3schools.com/html/mov_bbb.mp4", duration: 600 },
      { number: 2, title: "Crosswind", url: "https://www.w3schools.com/html/movie.mp4", duration: 720 }
    ]
  },
  {
    id: "a2",
    title: "Echo of Avalon",
    cover: "https://picsum.photos/seed/a2/400/600",
    status: "completed",
    genres: ["Drama","Fantasy"],
    sinopsis: "Legenda pedang yang bergema kembali.",
    popularity: 86,
    year: 2024,
    episodes: [
      { number: 1, title: "Awakening", url: "https://www.w3schools.com/html/mov_bbb.mp4", duration: 540 },
      { number: 2, title: "Trial", url: "https://www.w3schools.com/html/movie.mp4", duration: 540 }
    ]
  },
  {
    id: "a3",
    title: "Quantum Beat",
    cover: "https://picsum.photos/seed/a3/400/600",
    status: "ongoing",
    genres: ["Sci-Fi","Comedy"],
    sinopsis: "DJ kuantum menggoyang multisemesta.",
    popularity: 74,
    year: 2025,
    episodes: [
      { number: 1, title: "Phase Shift", url: "https://www.w3schools.com/html/mov_bbb.mp4", duration: 480 },
      { number: 2, title: "Entangle", url: "https://www.w3schools.com/html/movie.mp4", duration: 660 }
    ]
  }
];
