const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


/**
 * Fetches data from TMDB API
 */

export const fetchFromTMDB = async (endpoint:string, params = ""): Promise<any> => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&${params}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("TMDB request failed");
  }

  return res.json();
};


