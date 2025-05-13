import express from "express";
import {
  createReview,
  deleteReview,
  fetchAllReviews,
  fetchReview,
  updateReview,
} from '../controllers/reviewController';
import { verifyAccessToken } from "../middleware/verifyToken";

const router = express.Router();



router.post('/books/:bookId/reviews', createReview);

router.get('/', fetchAllReviews);
router.get('/:id', fetchReview);
router.patch('/:id', verifyAccessToken, updateReview);
router.delete('/:id', verifyAccessToken, deleteReview);

export default router;