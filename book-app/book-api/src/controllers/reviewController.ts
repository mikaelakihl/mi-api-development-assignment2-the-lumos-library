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

export const createReview = async (req: Request, res: Response) => {
    const {name,content,rating} = req.body
    try {
        const review = new Review({
            name: name,
            content: content,
            rating: rating,
        })
        const savedPun = await review.save();
        res.status(201).json({message: 'review created', data: savedPun})
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'unknown error'
        res.status(500).json({error:message})
    }
}

export const updateReview = async (req: Request, res: Response) => {
    const {name,content,rating} = req.body
    try {
        const updatedReview = await Review.updateOne(
            {_id: req.params.id},
            {$set: {
                name: name,
                content: content,
                rating: rating,
                }
            }
        )
        if(updatedReview.matchedCount === 0) {
            res.status(404).json({success: false, message: 'Review not Found'})
            return
        }
        res.json({message: 'review created', data: await Review.findById(req.params.id)})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'unknown error'
        res.status(500).json({error: message})
    }
}