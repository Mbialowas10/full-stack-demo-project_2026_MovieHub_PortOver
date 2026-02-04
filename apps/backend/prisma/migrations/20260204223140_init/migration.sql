/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `TMDBMovie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TMDBMovie_tmdb_id_key" ON "TMDBMovie"("tmdb_id");
