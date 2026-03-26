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
  
  // pass the term to the /search/movie endpoint of TMDB api. 
  // encodeURIComponent is used to ensure that the search term is properly encoded for use in a URL query string.
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
          movie={movie}
        />
      ))}
    </>
  );
};

export default SearchMovies;
