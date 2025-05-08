import express from 'express';
import { deleteUser, fetchAllUsers, fetchOneUser, updateUser } from '../controllers/userController';
import { verifyAccessToken } from '../middleware/verifyToken';

const router = express.Router()

router.get('/', fetchAllUsers)
router.get('/:id', fetchOneUser) 
router.patch('/:id', verifyAccessToken, updateUser); 
router.delete('/:id', verifyAccessToken,deleteUser);

export default router;