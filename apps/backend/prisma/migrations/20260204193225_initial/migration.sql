-- CreateTable
CREATE TABLE "TMDBMovie" (
    "id" SERIAL NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,

    CONSTRAINT "TMDBMovie_pkey" PRIMARY KEY ("id")
);
