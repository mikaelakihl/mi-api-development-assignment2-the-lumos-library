import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}));

import userRouter from './routes/userRouter';
app.use('/users',userRouter);
import bookRouter from './routes/bookRouter';
app.use('/books', bookRouter);
import reviewRouter from './routes/reviewRouter'
app.use('/reviews', reviewRouter)



mongoose.connect(process.env.MONGODB_URL || "");

const PORT = 3000
app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

