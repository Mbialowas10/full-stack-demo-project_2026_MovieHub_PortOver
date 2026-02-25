// src/types/Movie.ts
export interface TMDBMovie {
<<<<<<< HEAD
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
=======
    id: number;
    tmdb_id: number;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    popularity: number;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name: string;
    description: string;
    image: string;
>>>>>>> clerk
}
