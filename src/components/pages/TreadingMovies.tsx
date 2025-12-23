import { MovieCard } from '../MovieCard'
import { useTMDB } from '../../hooks/useTMDB';


/**
 * @returns TrendingMovies jsx
 * 
 */

const  TrendingMovies= () => {
  
  {/* /trending/movie/week endpoint call */}
  const movies = useTMDB("/trending/movie/week");

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