/*
  Warnings:

  - Added the required column `original_language` to the `TMDBMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_title` to the `TMDBMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TMDBMovie" ADD COLUMN     "original_language" TEXT NOT NULL,
ADD COLUMN     "original_title" TEXT NOT NULL,
ADD COLUMN     "video" BOOLEAN;
