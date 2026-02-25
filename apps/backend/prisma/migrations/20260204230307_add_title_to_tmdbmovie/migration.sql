/*
  Warnings:

  - You are about to drop the column `original_title` on the `TMDBMovie` table. All the data in the column will be lost.
  - Added the required column `title` to the `TMDBMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TMDBMovie" DROP COLUMN "original_title",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "popularity" DOUBLE PRECISION,
ADD COLUMN     "release_date" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "vote_average" DOUBLE PRECISION,
ADD COLUMN     "vote_count" INTEGER,
ALTER COLUMN "overview" DROP NOT NULL,
ALTER COLUMN "poster_path" DROP NOT NULL;
