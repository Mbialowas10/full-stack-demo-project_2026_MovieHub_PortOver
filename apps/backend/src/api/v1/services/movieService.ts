import {  Prisma, TMDBMovie } from "@prisma/client";
import { prisma } from "../../../db/prisma";


/**
 * Services access data from Prisma client or external APIs.
 * They call method on the ORM, which will send queries to the database.
 * and respond with data
 * 
 *More general info on Prisma: https://www.prisma.io/docs/orm/overview/prisma-in-your-stack/rest
 */


 /**  
  * Service method to fetch all movies from the database using Prisma client.
  * 
  */
 export const fetchAllMovies = async (): Promise<TMDBMovie[]> => {
    // get all records from Movie Table
    return prisma.tMDBMovie.findMany();
 }

 /**
  * Service method to fetch a single movie by its ID from the database using Prisma client.
  */
export const fetchMovieById = async (id: number): Promise<TMDBMovie | null> => {
    return prisma.tMDBMovie.findUnique({
        where: { id },
    });
}

/**
 * Implement create, update, delete service methods
*/
export const insertMovie = async (
  movieData: Prisma.TMDBMovieCreateInput
): Promise<TMDBMovie> => {
  return prisma.tMDBMovie.create({
    data: movieData,
  });
};

export const updateMovie = async (id: number, movieData: Partial<TMDBMovie>): Promise<TMDBMovie | null> => {
      const updatedMovie = await prisma.tMDBMovie.update({
         where: { id },
         data: movieData,
     });
     return updatedMovie;
 } 

export const deleteMovie = async (id: number): Promise<TMDBMovie | null> => {
    const deletedMovie = await prisma.tMDBMovie.delete({
        where: { id },
    });
    return deletedMovie;
}
