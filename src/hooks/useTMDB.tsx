// hooks/useTMDB.js
import { useEffect, useState } from "react";
import { fetchFromTMDB } from "../api/tmdb";

/**
 * 
 * @param endpoint 
 * @param params 
 * @param enabled 
 * @returns useTMDB custom hook
 */

export const useTMDB = (endpoint, params = "", enabled = true) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!enabled) return; // prevent unnecessary api calls

    fetchFromTMDB(endpoint, params)
      .then(res => setData(res.results || []))
      .catch(console.error);
  }, [endpoint, params, enabled]); // re-run useEffect when one of these dependencies changes

  return data;
};
