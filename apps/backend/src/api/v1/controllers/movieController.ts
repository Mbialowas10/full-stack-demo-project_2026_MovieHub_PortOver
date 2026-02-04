import { Request, Response, NextFunction } from "express";

/**
 * Controller methods used to determine how to handle requests for movie routes/requests.
 * It send the appropriate response back to the client or request to service (if required)
 */
export const getAllMovies = async(
    _req: Request, 
    res: Response, 
    _next: NextFunction
): Promise<void> => {
    try{
        const movies = await fetchMoviesFromService();
        res.json({ movies });
    }
    res.json({ movies: ["Movie 1", "Movie 2", "Movie 3"] });

}
