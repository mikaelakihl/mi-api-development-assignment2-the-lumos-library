import mongoose from "mongoose";
import { IBook } from "../types/IBook";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    published_year: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Reviews'}]
})

export default mongoose.model('Books', BookSchema);
