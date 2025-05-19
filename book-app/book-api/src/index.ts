import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();
const allowedOrigin = process.env.CLIENT_ORIGIN;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

app.options('*', cors({
    origin: allowedOrigin,
    credentials: true
}));

import userRouter from './routes/userRouter';
app.use('/users',userRouter);
import bookRouter from './routes/bookRouter';
app.use('/books', bookRouter);
import reviewRouter from './routes/reviewRouter'
app.use('/reviews', reviewRouter)



import authRouter from './routes/authRouter';
app.use('/auth',authRouter);

mongoose.connect(process.env.MONGODB_URL || "");

const PORT = 3000
app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

