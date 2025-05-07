import express from 'express';
import { deleteUser, fetchAllUsers, fetchOneUser, updateUser } from '../controllers/userController';

const router = express.Router()

router.get('/', fetchAllUsers)
router.get('/:id', fetchOneUser) 
router.patch('/:id', updateUser) 
router.delete('/:id', deleteUser)

export default router;