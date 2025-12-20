import { useState } from 'react'
import MovieCard from './components/MovieCard';
import movies from './data/movies.json'

const  App = () => {
  

  return ( 
    <> 
      { movies.movies.map( (movie) => (
        <MovieCard
          key={movie.name}
          name={movie.name}
          description={movie.description}
          image = {movie.image}
        />
      ))}
    </>
   );
}
 
export default App;


