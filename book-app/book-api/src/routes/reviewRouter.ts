import  express from "express";
import {
    fetchAllReviews,
    fetchReview
} from '../controllers/reviewController';

const router = express.Router()

router.get('/', fetchAllReviews)
router.get('/:id', fetchReview)



export default router