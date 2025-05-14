import { Request,Response } from "express";
import Review from "../models/Review";
import Book from "../models/Book"

//  This controller fetches all reviews from the database.
export const fetchAllReviews = async (_: Request,res: Response) => {
    try {
        res.json(await Review.find());
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'unknown error'
        res.status(500).json({error: message})
    }
}

//  Fetches a single review by id.
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

//  creates a new review from request body data and saves it in the database.
export const createReview = async (req: Request, res: Response) => {
    const { name, content, rating } = req.body;
    const { bookId } = req.params;

    try {
        // Step 1: Create and save the review
        const review = new Review({
            name,
            content,
            rating,
            book: bookId, // important if you're adding this to schema
        });

        const savedReview = await review.save();

       
        await Book.findByIdAndUpdate(
            bookId,
            { $push: { reviews: savedReview._id } },
            { new: true }
        );

        res.status(201).json({ message: 'Review created', data: savedReview });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

//  Updates a review by id with new data from the request body.
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

//  Deletes a review by id.
export const deleteReview = async (req: Request, res: Response) => {
    try{
        const deletedReview = await Review.deleteOne({_id: req.params.id})
        if(deletedReview.deletedCount === 0) {
            res.status(404).json({success: false,message: 'Review not found'})
            return
        }
        res.json({message: 'Review deleted'})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message: 'unknown error'
        res.status(500).json({error: message})
    }
}

