import mongoose, {Schema} from "mongoose";

const discussionSchema = new Schema({

    topic: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    resources: {
        type: String,
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const DiscussionModel = mongoose.model("DiscussionModel", discussionSchema); 