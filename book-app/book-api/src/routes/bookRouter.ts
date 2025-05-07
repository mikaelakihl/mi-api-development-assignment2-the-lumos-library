import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/bookController';
// import { verifyAccessToken } from '../middleware/verifyToken';

const router = express.Router(); 

router.get('/', getAllBooks);
router.get('/:id', getBookById);

// These 3 are protected and needs to be logged in to access.
router.post('/', /*verifyAccessToken,*/ createBook);
router.patch('/:id', /*verifyAccessToken,*/ updateBook);
router.delete('/:id', /*verifyAccessToken,*/ deleteBook);

export default router;
