
/**
 * Services access data from Prisma client or external APIs.
 * They call method on the ORM, which will send queries to the database.
 * and respond with data
 * 
 *More general info on Prisma: https://www.prisma.io/docs/orm/overview/prisma-in-your-stack/rest
 */

 export const fetchAllMovies = async (): Promise<Movie[]> => {
    // get all records from Movie Table
    return prisma.term.findMany();
 }