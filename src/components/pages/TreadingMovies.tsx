// src/components/pages/TrendingMovies.tsx
import { MovieCard } from "../MovieCard";
import { useTMDB } from "../../hooks/useTMDB";
import type { TMDBMovie } from "../../types/TMDBMovie";

/**
 * TrendingMovies component fetches and displays a list of trending movies and tv shows from TMDB API
 * It uses the custom useTMDB hook to fetch data and renders MovieCard components for each movie
 * @returns 
 */
const TrendingMovies = () => {

  // use custom hook to fetch trending movies from TMDB api
  const movies = useTMDB<TMDBMovie[]>("/trending/movie/week");

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id} // use TMDB ID as key
          movie={movie}  // pass entire movie object as prop
        />
      ))}
    </>
  );
};

export default TrendingMovies;
