import  express from "express";
import {
    fetchAllReviews
} from '../controllers/reviewController';

const router = express.Router()

router.get('/', fetchAllReviews)



export default router