import { useEffect, useState } from 'react'
import { MovieCard } from '../MovieCard'


const  TrendingMovies= () => {
    const [movies, setMovies] = useState([])

  useEffect( () => {
    fetch('http://localhost:4000/results')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setMovies(data)
    })
    .catch(err => console.error(err))
  },[])

  return ( 
    <> 
      { movies.map( (movie) => (
        <MovieCard
          key={movie.original_title}
          name={movie.original_title}
          description={movie.overview}
          image = {
            `https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=ce44532488cb6dc0691b05df5f5280db`
            }
        />
      ))}
    </>
   );
}
 
export default TrendingMovies;