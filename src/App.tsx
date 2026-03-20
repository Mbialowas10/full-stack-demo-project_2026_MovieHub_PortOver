import Layout  from "./components/layout/Layout"
import { Routes, Route } from "react-router-dom";
import TrendingMovies from "./components/pages/TreadingMovies";
import SearchMovies from "./components/pages/SearchMovies";
import Favourites from "./components/pages/Favourites";
import Reviews from "./components/pages/Reviews";
import {ErrorBoundary} from "./components/ErrorBoundary";
import {LeaveReview} from "./components/LeaveReview"
import SignInPage from "./components/pages/SignIn";


/**
 * Description: Main entry point into React app (Frontend)
 * 
 * @returns 
 */
const  App = () => {
  return(
    <Routes>
    {/* Layout renders all child routes via outlet */}
      <Route path="/" element={<Layout />}>
        
        {/* A Route just loads a component when path visited. */}
        {/* TrendingMovies - fetches trending shows from TMDB api*/}
        <Route index element={<TrendingMovies />}/>
        
        <Route path="search" element={
          <ErrorBoundary>
            <SearchMovies/>
          </ErrorBoundary>
          }/>
      
        <Route path="favourites" element={<Favourites/>}/>
        <Route path="reviews" element={<Reviews/>} />
        <Route path="reviews/new" element={<LeaveReview />} />
        <Route path="search/reviews/new" element={<LeaveReview />}/>
        <Route path="login" element={<SignInPage />} />
      </Route>
  </Routes>
 
  )
  
}
 
export default App;


 