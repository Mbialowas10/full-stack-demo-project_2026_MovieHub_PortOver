import { useEffect, useState } from 'react'
import SearchForm from "../SearchForm";
import { MovieCard } from '../MovieCard';
import { fetchFromTMDB } from '../../api/tmdb';
import { useTMDB } from '../../hooks/useTMDB';

const SearchMovies = () => {
    
    const [term, setTerm] = useState("")
    
    const movies = useTMDB(
        "/search/movie",
        `query=${encodeURIComponent(term)}`,
        Boolean(term) // prevent auto-fetch on mount
    )

    const handleSearch = (searchValue:string) =>{
        console.log("Searching for: ", searchValue);
        setTerm(searchValue)
    }

    useEffect( () => {
        if (!term) return;
        //fetch('http://localhost:4000/results')
        //fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${term}`)
        fetchFromTMDB("/search/movie", `query=${encodeURIComponent(term)}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setMovies(data.results || [])
        })
        .catch(err => console.error(err))
      },[term])


    return ( 
        <>
            <h1>Search Movies</h1>
            <SearchForm onSearch={handleSearch}/>

            
             { movies.map( (movie) => (
                    <MovieCard
                      key={movie.original_title}
                      name={movie.original_title}
                      description={movie.overview}
                      image = {
                        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        } 
                        />
                  ))}
        </>
     );
}
 
export default SearchMovies
