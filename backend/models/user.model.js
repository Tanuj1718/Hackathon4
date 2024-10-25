import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)