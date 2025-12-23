// hooks/useTMDB.js
import { useEffect, useState } from "react";
import { fetchFromTMDB } from "../api/tmdb";

export const useTMDB = (endpoint, params = "", enabled = true) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!enabled) return;

    fetchFromTMDB(endpoint, params)
      .then(res => setData(res.results || []))
      .catch(console.error);
  }, [endpoint, params, enabled]);

  return data;
};
