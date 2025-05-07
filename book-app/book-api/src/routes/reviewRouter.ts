import  express from "express";
import {
    createReview,
    fetchAllReviews,
    fetchReview
} from '../controllers/reviewController';

const router = express.Router()

router.get('/', fetchAllReviews)
router.get('/:id', fetchReview)
router.post('/', createReview)


export default router