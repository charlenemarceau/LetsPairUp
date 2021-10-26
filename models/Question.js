const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        trim: true,
        max: 500,
    },
    username: {
        type: String, 
        required:true,
    },
    categories: {
        type: String,
        required: true,
    },
    comments: {
        type: [{
            commenterId: String,
            commenterPseudo: String,
            text: String,
            timestamp: Number,
        }],
        required: true,
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Question", QuestionSchema);