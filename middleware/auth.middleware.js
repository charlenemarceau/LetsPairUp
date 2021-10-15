const jwt = require('jsonwebtoken');
const User = require("../models/User");
const mongoose = require('mongoose');


module.exports.checkUser = (req, res, next) => {
    // fetching if cookies
    let token = req.cookies.jwt;
    // if token, need to verify
    if (token) {
        console.log(token)
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            // if error, fake jwt so we remove user token
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                res.status(403).json("Not allowed")
            } else {
                console.log("decoded token "+ decodedToken.id);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        })
        // if no token, null
    } else {
        res.locals.user = null;
        res.status(403).json("Not allowed")

    }
}

module.exports.requireAuth = (req, res, next) => {
    //check if token 
    let token = req.cookies.jwt;
    if (token) {
        console.log(token)
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
        // if error, stop
            console.log(err);
            res.status(200).json('No token')
        } else { 
            console.log("bon"+ decodedToken.id);
            next();
        }
        });
    } else {
        console.log('No token')
    }
};