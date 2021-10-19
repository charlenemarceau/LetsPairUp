const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt'); //to hash and crypt the password
const jwt = require ("jsonwebtoken");
const { registerErrors, logInErrors } = require("../Utils/errors.utils");


const maxToken = 3 * 24 * 60 * 60 *1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxToken
    })
}
//Register
router.post("/register", async (req, res) => {
    try {
        //generate new password and hashed it
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = new User ({
             username:req.body.username,
             email:req.body.email,
             password:hashedPassword,
             age:req.body.age,
             city:req.body.city,
        });
        // save user and respond
       const user = await newUser.save();
       res.status(201).send(user);
   } catch (err) {
       const errors = registerErrors(err);
        res.status(200).send({errors});
   }
})


router.post("/login", async (req, res) => {
    try {
        // find the user email in the database, if not error
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).send('User not found');
        // check if the password is identical to the one saved in the database, if not error
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password");
        // generate an access token
        const token = createToken(user._id);
        res.cookie('jwt', token,  { httpOnly: true, maxToken});
        res.status(200).json({user: user._id})
    } catch (err) {
       res.status(200).send(err);
    }
})


//LOG OUT
router.get("/logout", (req, res) => {
    res.cookie('jwt', ' ', {maxAge : 1});
    res.status(200).json("good")
})



module.exports = router;

