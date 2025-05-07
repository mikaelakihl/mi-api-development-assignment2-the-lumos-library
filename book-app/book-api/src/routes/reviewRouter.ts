import  express from "express";
import {
    createReview,
    fetchAllReviews,
    fetchReview,
    updateReview
} from '../controllers/reviewController';
import { verifyAccessToken } from "../middleware/verifyToken";

const router = express.Router()

router.get('/', fetchAllReviews)
router.get('/:id', fetchReview)
router.post('/', createReview)

router.patch('/:id',verifyAccessToken, updateReview)
export default router