-- CreateTable
CREATE TABLE "Favourite" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_userId_movieId_key" ON "Favourite"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "TMDBMovie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
