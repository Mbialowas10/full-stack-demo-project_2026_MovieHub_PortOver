// prisma/tmdb.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  throw new Error("TMDB_API_KEY is not set in .env");
}

export async function fetchFromTMDB(
  endpoint: string,
  params: string = ""
) {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&${params}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.statusText}`);
  }

  return res.json();
}
