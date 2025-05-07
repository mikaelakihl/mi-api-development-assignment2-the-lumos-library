import express from 'express';
import { loginUser, register } from '../controllers/authController';


const router = express.Router()


router.post('/login', loginUser)
router.post('/register', register)

export default router;