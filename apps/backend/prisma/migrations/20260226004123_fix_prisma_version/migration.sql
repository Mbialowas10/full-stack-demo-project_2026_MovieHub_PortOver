/*
  Warnings:

  - You are about to drop the `_UserFavouriteMovies` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_UserFavouriteMovies" DROP CONSTRAINT "_UserFavouriteMovies_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavouriteMovies" DROP CONSTRAINT "_UserFavouriteMovies_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "_UserFavouriteMovies";

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_movieId_key" ON "Review"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
