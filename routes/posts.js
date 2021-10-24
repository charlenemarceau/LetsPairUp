const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");
const multer = require('multer');
const upload = multer();
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require('../Utils/errors.utils');

// create a post
router.post('/', upload.single('file'), async (req, res) => {
    let fileName;
    // if image then verify file type and size
    if (req.file !== null) {
      try {
        if (
          // accept only jpg, png and jpeg
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
          throw Error("invalid file");
  
        if (req.file.size > 500000) throw Error("max size");
      } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
      }
      // create file name
      fileName = req.body.userId + Date.now() + ".jpg";
      // create path
      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../client/public/uploads/posts/${fileName}`
        )
      );
    }
  
    const newPost = new Post({
      posterId: req.body.posterId,
      message: req.body.message,
      // if not null, create path
      image: req.file !== null ? `./uploads/posts/${fileName}` : "",
      comments: [],
    });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(400).json(err)
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

// like a post
router.patch("/:id/like", async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.id);
        // find the current user
        const user = await User.findById(req.body.userId);
        // check if current user does not already liked the post
        if (!post.likers.includes(req.body.userId)) {
            // if not already liked, push current user id in the posts' likes
            await post.updateOne({
                $push: {
                    likers: req.body.userId
                }
            },{ new: true });
            (err, docs) => {
                if (err) return res.status(400).send(err);
              }
            // if (!user.likes.includes(req.params.id)) {
            await user.updateOne({
                $push: {
                    likes: req.params.id
                }
            }, {new: true});
            // }
            res.status(200).json("The post has been liked.")
        } else { // if already liked, error message
            res.status(200).json("You already like this post.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// unlike a post
router.patch("/:id/unlike", async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.body.userId);
        // check if current user already liked the post
        if (post.likers.includes(req.body.userId)) {
            // if  already liked, pull current user id of the posts' likers
            await post.updateOne({
                $pull: {
                    likers: req.body.userId
                }
            }, { new: true });
            // and pull the post id from the user's likes
            await user.updateOne({
                $pull: {
                    likes: req.params.id
                }
            }, {new: true});
            res.status(200).json("The post has been disliked.");
            (err, docs) => {
                if (err) return res.status(400).send(err);
              }
        } else { // else message error
            res.status(200).json("You don't like this post")
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

// get all posts
router.get("/", (req, res) => {
    Post.find((err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(err)
      }
    }).sort({createdAt: -1})
});

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
        return Post.findByIdAndUpdate(req.params.id, {
        // get comment id from the request and pull it from the comments
            $pull: {
                comments: {
                    _id: req.body.commentId,
                }
            }
        },
        // console.log(req.params.id, req.body.commentId),
        { new: true },
        (err, docs) => {
            if (!err) { 
                return res.status(200).json("The comment has been deleted." + docs)

            } else {
              return res.status(400).send(err);
            }
        })
    } catch (err) {
        return res.status(400).send(err);
    }
});



module.exports = router;