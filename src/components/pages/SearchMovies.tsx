import { useEffect, useState } from "react";
import SearchForm from "../SearchForm";
import { MovieCard } from "../MovieCard";
import { fetchFromTMDB } from "../../api/tmdb";
import type { TMDBMovie } from "../../types/TMDBMovie";

const SearchMovies = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [term, setTerm] = useState("");

  const handleSearch = (searchValue: string) => {
    console.log("Searching for:", searchValue);
    setTerm(searchValue);
  };

  useEffect(() => {
  if (!term) return;

  fetchFromTMDB("/search/movie", `query=${encodeURIComponent(term)}`)
    .then((data) => {
      setMovies(data.results ?? []);
    })
    .catch((err) => console.error(err));
}, [term]);


  

  return (
    <>
      <h1>Search Movies</h1>
      <SearchForm onSearch={handleSearch} />

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

export default SearchMovies;
