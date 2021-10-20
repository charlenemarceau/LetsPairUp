const jwt = require('jsonwebtoken');
const User = require("../models/User");


module.exports.checkUser = (req, res, next) => {
  // fetch cookies jwt
  const token = req.cookies.jwt; 
  if (token) {
    // if token, verify if valid
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
          if (err) {
              res.locals.user = null;
              // res.cookie('jwt', "", { maxAge : 1});
              next();
          } else {
            // if valid, find user
              let user = await User.findById(decodedToken.id);
              res.locals.user = user; 
              next();
          }
      });
  } else {
      res.locals.user = null;
      next();
  }
};
  
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
            res.status(200).json('No valid token')
        } else { 
            // req.userId = decodedToken.id;
            console.log("bon"+ decodedToken.id);
            next();
        }
        });
    } else {
        console.log('No token')
    }
};