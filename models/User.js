const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator');


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength:30,
            unique: true,
            trim:true,
        },
        email: {
            type: String, 
            required: true,
            validate:[isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 50,
            minLength: 6,
        },
        avatar: {
            type: String,
            default: "./uploads/profil/random-user.jpg"
        },
        age: {
            type: Number,
            min: 18,
            required: true,
        },
        city: {
            type: String,
            required:true,
        },
        from: {
            type: String,
            required:true,
            default: "France"
        },
        arrivedDate: {
            type: Date,
        },
        bio: {
            type: String,
            max: 1000,
        },
        followers: {
            type: [String],
            default:""
        },
        following: {
            type: [String],
            default: ""
        },
        likes: {
            type: [String],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);