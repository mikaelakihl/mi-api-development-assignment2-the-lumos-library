import mongoose, { Types } from "mongoose";

// Define the interface
export interface IReviews {
  name: string;
  content: string;
  rating: number;
  created_at?: Date;
  book: Types.ObjectId;
}

const Schema = mongoose.Schema;

// Define the schema using the interface
const ReviewSchema = new Schema<IReviews>({
  name: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
});

// Export the model
export default mongoose.model<IReviews>('Reviews', ReviewSchema);