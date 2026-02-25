-- CreateTable
CREATE TABLE "_UserFavouriteMovies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFavouriteMovies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserFavouriteMovies_B_index" ON "_UserFavouriteMovies"("B");

-- AddForeignKey
ALTER TABLE "_UserFavouriteMovies" ADD CONSTRAINT "_UserFavouriteMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "TMDBMovie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavouriteMovies" ADD CONSTRAINT "_UserFavouriteMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
