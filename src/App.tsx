import { Layout } from "./components/layout/Layout";
//import movies from './data/now_playing.json'

import { Routes, Route } from "react-router-dom";
import TrendingMovies from "./components/pages/TreadingMovies";
import SearchMovies from "./components/pages/SearchMovies";
import Favourites from "./components/pages/Favourites";
import Reviews from "./components/pages/Reviews";
import Profile from "./components/pages/Profile";



const  App = () => {
  return(
    <Routes>
    {/* Layout renders all child routes via outlet */}
    <Route path="/" element={<Layout />}>

      <Route index element={<TrendingMovies />}/>
      <Route path="search" element={<SearchMovies/>}/>
      <Route path="favourites" element={<Favourites/>}/>
      <Route path="reviews" element={<Reviews/>} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Routes>
 
  )
  
}
 
export default App;


