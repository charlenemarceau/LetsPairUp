const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    ask: {
        type: String,
        trim: true,
        max: 500,
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