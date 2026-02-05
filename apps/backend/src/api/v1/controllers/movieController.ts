import { Request, Response, NextFunction } from "express";
import { fetchAllMovies } from "../services/movieService";

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
        const movies = await fetchAllMovies();
        res.json({ movies });
    }
    catch(error){
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Failed to fetch movies" });
    }

}
