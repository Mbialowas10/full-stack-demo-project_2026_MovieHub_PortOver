/*
  Warnings:

  - You are about to drop the column `original_language` on the `TMDBMovie` table. All the data in the column will be lost.
  - You are about to drop the column `original_title` on the `TMDBMovie` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `TMDBMovie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TMDBMovie" DROP COLUMN "original_language",
DROP COLUMN "original_title",
DROP COLUMN "video";
