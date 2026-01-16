import {Request,Response, NextFunction} from "express";


export const getMovies = (req: Request, res: Response) => {
    res.json({ movies: ["Movie 1", "Movie 2", "Movie 3"] });

}
