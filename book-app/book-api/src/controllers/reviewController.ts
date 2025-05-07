import { Request,Response } from "express";
import Review from "../models/Review";

export const fetchAllReviews = async (_: Request,res: Response) => {
    try {
        res.json(await Review.find());
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'unknown error'
        res.status(500).json({error: message})
    }
}