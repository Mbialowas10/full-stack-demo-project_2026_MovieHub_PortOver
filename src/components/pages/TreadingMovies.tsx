// src/components/pages/TrendingMovies.tsx
import React from "react";
import { MovieCard } from "../MovieCard";
import { useTMDB } from "../../hooks/useTMDB";
import type { TMDBMovie } from "../../types/TMDBMovie";

const TrendingMovies = () => {
  const movies = useTMDB<TMDBMovie[]>("/trending/movie/week");

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieID={movie.id}
          name={movie.original_title}
          description={movie.overview}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.png" // fallback if no poster
          }
        />
      ))}
    </>
  );
};

export default TrendingMovies;
