// src/components/pages/TrendingMovies.tsx
import React from "react";
import { MovieCard } from "../MovieCard";
import { useTMDB } from "../../hooks/useTMDB";
import type { TMDBMovie } from "../../types/TMDBMovie";
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
