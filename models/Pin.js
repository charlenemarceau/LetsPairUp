const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PinSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        lat: {
            type:Number,
            require:true,
        },
        long: {
            type:Number,
            require:true,
        },
        link: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Pin", PinSchema);