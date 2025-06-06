import mongoose from "mongoose";
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    is_admin: {
        type: Boolean,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Users', UserSchema);