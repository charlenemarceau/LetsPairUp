const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    posterId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        trim: true,
        max: 500,
    },
    image: {
        type: String,
    },
    comments: {
        type: [{
            commenterId: String,
            commenterPseudo: String,
            text: String,
            timestamp: Number,
        }],
        required: true,
    },
    likers: {
        type: [String],
        required: true,
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", PostSchema);