import { Request, Response, NextFunction } from "express";


export const getMovies = (_req: Request, res: Response, _next: NextFunction) => {
    res.json({ movies: ["Movie 1", "Movie 2", "Movie 3"] });

}
