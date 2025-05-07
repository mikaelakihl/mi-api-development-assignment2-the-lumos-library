import express from 'express';
import { fetchAllUsers, fetchOneUser } from '../controllers/userController';

const router = express.Router()

router.get('/', fetchAllUsers)
router.get('/:id', fetchOneUser) 

export default router;