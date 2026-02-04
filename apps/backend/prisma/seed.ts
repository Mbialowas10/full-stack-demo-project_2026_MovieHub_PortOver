import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { fetchFromTMDB } from "./tmdb";

type TMDBMovieResponse = {
  page: number;
  results: TMDBMovieDTO[];
  total_pages: number;
  total_results: number;
};

type TMDBMovieDTO = {
  id: number;
  title: string;
  overview: string;
  release_date: string | null;
  poster_path: string | null;
  popularity: number;
  vote_average: number;
  vote_count: number;
};

function getPrisma() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  const pool = new Pool({ connectionString: databaseUrl });

  return new PrismaClient({
    adapter: new PrismaPg(pool),
  });
}

const prisma = getPrisma();

async function main() {
  console.log("🎬 Fetching TMDB movies...");

  const data = (await fetchFromTMDB(
    "/movie/popular",
    "page=1"
  )) as TMDBMovieResponse;

  const movies = data.results.map((movie) => ({
    tmdb_id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date
      ? new Date(movie.release_date)
      : null,
    poster_path: movie.poster_path,
    popularity: movie.popularity,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  }));

  const result = await prisma.tMDBMovie.createMany({
    data: movies,
    skipDuplicates: true,
  });

  console.log(`✅ Seeded TMDBMovie: inserted ${result.count} rows`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
