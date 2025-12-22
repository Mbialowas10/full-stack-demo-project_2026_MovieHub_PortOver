import { Layout } from "./components/layout/Layout";
//import movies from './data/now_playing.json'

import { Routes, Route } from "react-router-dom";
import TrendingMovies from "./components/pages/TreadingMovies";



const  App = () => {
  return(
    <Routes>
    {/* Layout renders all child routes via outlet */}
    <Route path="/" element={<Layout />}>

      <Route index element={<TrendingMovies />}/>
    </Route>
  </Routes>
 
  )
  
}
 
export default App;


