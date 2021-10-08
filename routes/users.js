const router = require("express").Router();
const User = require ('../models/User');
const bcrypt = require('bcrypt'); //to hash and crypt the password


// update user
router.put("/:id", async (req, res) => {
    // check if user is changing their informations or if the user is admin
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // update password
        if (req.body.password) {
            try {
                // update user information
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });

//delete user
router.delete("/:id", async (req, res) => {
    // check if user is changing their own informations or if the user is admin
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted.");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
      return res.status(403).json("You can delete only your account.");
    }
  });

//get a user
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      // to not render password and updated at
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
});

// follow a user
router.put('/:id/follow', async (req, res) => {
    // check if current user and the user being followed are not the same user/id
    if (req.body.userId !== req.params.id) {
        try {
            // find user who is going to be followed
            const user = await User.findById(req.params.id);
            // if not the same id, find current user
            const currentUser = await User.findById(req.body.userId);
            // check if follower is already followed
            // if not : push current user id in the followers of user followed
            // and push in the following of the user followed the current user id
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId } });
                await currentUser.updateOne({$push: {following: req.params.id } });
                res.status(200).json('Followed!')
            } else { // else error
                res.status(403).json('You are already following this user.');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You can not follow yourself')
    }
})

// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    // check if current user and the user being unfollowed are not the same user/id
    if (req.body.userId !== req.params.id) {
        try {
            // find user who is going to be unfollowed
            const user = await User.findById(req.params.id);
            // if not the same id, find current user
            const currentUser = await User.findById(req.body.userId);
            // check if follower is already followed
            // if followed, pull current user id out of the followers of user unfollowed
            // and pull out of the following of the user unfollowed, the current user id
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: {followers: req.body.userId } });
                await currentUser.updateOne({$pull: {following: req.params.id } });
                res.status(200).json('Unfollowed!')
            } else { // else error
                res.status(403).json("You don't follow this user.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You can not unfollow yourself.')
    }
})



module.exports = router;

