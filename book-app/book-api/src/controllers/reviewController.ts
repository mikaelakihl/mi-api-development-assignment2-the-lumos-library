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

export const fetchReview = async (req: Request,res: Response) => {
    try {
        const review = await Review.findOne({_id: req.params.id})
        if(!review) {
            res.status(404).json({message: 'Review not Found'})
            return;
        }
        res.json(review);
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message: 'Unknown error'
        res.status(500).json({error: message})
    }
}