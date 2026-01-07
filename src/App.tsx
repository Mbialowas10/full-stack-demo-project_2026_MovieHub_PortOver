import { Layout } from "./components/layout/Layout";
//import movies from './data/now_playing.json'

import { Routes, Route } from "react-router-dom";
import TrendingMovies from "./components/pages/TreadingMovies";
import SearchMovies from "./components/pages/SearchMovies";
import Favourites from "./components/pages/Favourites";
import Reviews from "./components/pages/Reviews";
import Profile from "./components/pages/Profile";
import {ErrorBoundary} from "./components/ErrorBoundary";
import {LeaveReview} from "./components/LeaveReview"


/**
 * Main entry point into React app
 * 
 * @returns 
 */
const  App = () => {
  return(
    <Routes>
    {/* Layout renders all child routes via outlet */}
    <Route path="/" element={<Layout />}>
      
      {/* A Route just loads a component when path visited. */}
      <Route index element={<TrendingMovies />}/>
      
      <Route path="search" element={
        <ErrorBoundary>
          <SearchMovies/>
        </ErrorBoundary>
        }/>
    
      <Route path="favourites" element={<Favourites/>}/>
      <Route path="reviews" element={<Reviews/>} />
      <Route path="profile" element={<Profile />} />
      <Route path="reviews/new" element={<LeaveReview />} />
      <Route path="search/reviews/new" element={<LeaveReview />}/>
    </Route>
  </Routes>
 
  )
  
}
 
export default App;


 