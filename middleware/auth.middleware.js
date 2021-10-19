const jwt = require('jsonwebtoken');
const User = require("../models/User");
const mongoose = require('mongoose');


function verify(req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  }
  
module.exports.verify;

module.exports.requireAuth = (req, res, next) => {
    //check if token 
    let token = req.cookies.jwt;
    if (token) {
        // console.log(token)
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
        // if error, stop
            console.log(err);
            res.status(200).json('No token')
        } else { 
            req.userId = decodedToken.id;
            // console.log("bon"+ decodedToken.id);
            next();
        }
        });
    } else {
        console.log('No token')
    }
};