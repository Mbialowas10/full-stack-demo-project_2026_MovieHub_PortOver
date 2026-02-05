import { Request, Response, NextFunction } from "express";
import { fetchAllMovies, fetchMovieById, insertMovie } from "../services/movieService";


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

/**
 * Controller method to fetch a single movie by its ID. It extracts the ID from the request parameters,
 */
export const getMovieById = async(
    req: Request, 
    res: Response,
    _next: NextFunction
): Promise<void> => {
    try{
        const id = Number.parseInt(req.params.id as string, 10);
        const movie = await fetchMovieById(id);
        if(movie){
            res.json({ movie });
        }   else {
            res.status(404).json({ error: "Movie not found" });
        }   
    }
    catch(error){
        console.error("Error fetching movie by ID:", error);
        res.status(500).json({ error: "Failed to fetch movie" });
    }   

}

/**
implement create, update, delete controller methods
*/
export const createMovie = async(
    req: Request, 
    res: Response,  
    _next: NextFunction
): Promise<void> => {
    try{
       
        // TODO - implement create movie logic
        req.body = {
            // sample data structure
            id: req.body.id,
            tmdb_id: req.body.tmdb_id,
            title: req.body.title,
            overview: req.body.overview,
            release_date: req.body.releaseDate,
            poster_path: req.body.posterPath,
            popularity: req.body.popularity,
            vote_average: req.body.voteAverage,
            vote_count: req.body.voteCount,
        }
        const createdMovie = await insertMovie(req.body);
        res.status(201).json({ message: "Movie created successfully", createdMovie });

    }
    catch(error){
        console.error("Error creating movie:", error);
        res.status(500).json({ error: "Failed to create movie" });
    }
}

// export const updateMovie = async(
//     req: Request, 
//     res: Response, 
//     _next: NextFunction
// ): Promise<void> => {
//     try{
//         // TODO - implement update movie logic
//         res.status(501).json({ error: "Update movie endpoint not implemented yet" });
//     }
//     catch(error){
//         console.error("Error updating movie:", error);
//         res.status(500).json({ error: "Failed to update movie" });
//     }
// }

// export const deleteMovie = async(
//     req: Request, 
//     res: Response, 
//     _next: NextFunction
// ): Promise<void> => {
//     try{
//         // TODO - implement delete movie logic
//         res.status(501).json({ error: "Delete movie endpoint not implemented yet" });
//     }
//     catch(error){
//         console.error("Error deleting movie:", error);
//         res.status(500).json({ error: "Failed to delete movie" });
//     }
// }