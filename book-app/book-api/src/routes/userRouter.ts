import express from 'express';
import { fetchAllUsers, fetchOneUser, updateUser } from '../controllers/userController';

const router = express.Router()

router.get('/', fetchAllUsers)
router.get('/:id', fetchOneUser) 
router.patch('/:id', updateUser) 

export default router;