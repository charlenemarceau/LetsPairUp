const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update a post
router.put('/:id', async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.id);
        // check if current user posted the message
        if (post.userId === req.body.userId) {
            // if yes, update message
            await post.updateOne({
                $set: req.body
            });
            res.status(200).json("Your post has been updated")
        } else {
            res.status(403).json("You can updated only your posts")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a post
router.delete('/:id', async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.id);
        // check if current user posted the message
        if (post.userId === req.body.userId) {
            // if yes, delete message
            await post.deleteOne();
            res.status(200).json("Your post has been deleted")
        } else {
            res.status(403).json("You can delete only your posts")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// like and dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.id);
        // check if current user does not already liked the post
        if (!post.likes.includes(req.body.userId)) {
            // if not already liked, push current user id in the posts' likes
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            });
            res.status(200).json("The post has been liked.")
        } else { // if already liked, dislike the post
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            })
            res.status(200).json("The post has been disliked.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// get a post
router.get("/:id", async (req, res) => {
    try {
        //compare id with the post id
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        // find correct user id
        const currentUser = await User.findById(req.params.userId);
        // fetch all current user's posts
        const userPosts = await Post.find({
            userId: currentUser._id
        });
        // fetch all followings' posts
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({
                    userId: friendId
                })
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user's all post
router.get("/profile/:username", async (req, res) => {
    try {
        // find correct user 
        const user = await User.findOne({username: req.params.username});
        // find all user's posts
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


// comment post
router.post('/comment-post/:id', async (req, res) => {
    try {
        return Post.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: {
                    commenterId: req.body.commenterId,
                    commenterPseudo: req.body.commenterPseudo,
                    text: req.body.text,
                    timestamp: new Date().getTime(),
                }
            }
        }, {
            new: true
        },
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                return res.status(400).send(err);
            }
        });
    } catch (err) {
        return res.status(400).send(err);
    };
})

// delete comment
router.delete('/delete-comment-post/:id', async (req, res) => {
    try {
        // find post
        const post = await Post.findByIdAndUpdate(req.params.id);
        // get comment id from the request
        const TheComment = req.body.commentId;
        console.log(post, TheComment)
        // get comment from post and filter to only keep the one comment to delete. valueOf to get the value of the object id in string
        const currentComment = post.comments.filter((comment) => TheComment === comment._id.valueOf())[0];
        // check if empty
        if (currentComment.length) {
            // if not, pull the comment from the data
            await Post.findByIdAndUpdate(req.params.id, {
                $pull: {
                    comments: {
                        _id: currentComment._id,
                    }
                }
            });
            res.status(200).json("The comment has been deleted.")
        } else {
            res.status(500).send(err)
        }
        (err, docs) => {
            if (!err) { 
                return res.send(docs);
            } else {
              return res.status(400).send(err);
            }
        }
    } catch (err) {
        return res.status(400).send(err);
    }
});



module.exports = router;