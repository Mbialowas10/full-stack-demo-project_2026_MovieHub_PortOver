import { TMDBMovie } from "@prisma/client";

export const tmdbMovieSeedData: TMDBMovie[] = [
  {
    tmdb_id: 550,
    original_title: "Fight Club",
    overview: `A ticking-time-bomb insomniac and a slippery soap salesman channel their inner 
demons and fight for survival in a world where the only way to be free is to fight back.`,
    poster_path: "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg"
  },
  {
    tmdb_id: 278,
    original_title: "The Shawshank Redemption",
    overview: `Framed in the 1940s for the double murder of his wife and her lover, upstanding 
banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting 
skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be 
admired by the other inmates—including an older prisoner named Red—for his integrity and unquenchable sense of hope.`,
    poster_path: "/88Rm70213205470c93f1c28f1b.jpg"
  }
];

    