import { MovieCard } from "../MovieCard";
import { useTMDB } from "../../hooks/useTMDB";
import type { Movie } from "../../types/Movie";

const TrendingMovies = () => {
  const movies = useTMDB<Movie[]>("/trending/movie/week");

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieID={movie.id}
          name={movie.original_title}
          description={movie.overview}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      ))}
    </>
  );
};

export default TrendingMovies;
