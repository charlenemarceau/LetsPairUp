const router = require("express").Router();
const Question = require("../models/Question");
const User = require("../models/User");

// read questions 
// router.get("/", (req, res) => {
//     Question.find((err, docs) => {
//       if (!err) {
//         res.send(docs);
//       } else {
//         console.log(err)
//       }
//     }).sort({createdAt: -1})
//   });

// GET ALL QUESTIONS BY CAT 
//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let questions;
      if (username) {
        questions = await Question.find({ username });
      } else if (catName) {
        questions = await Question.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        questions = await Question.find();
      }
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// create a question
router.post('/', async (req, res) => {
    const newQuestion = new Question(req.body);
    try {
        const savedQuestion = await newQuestion.save();
        res.status(200).json(savedQuestion)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update a question
router.put('/:id', async (req, res) => {
    try {
        // find the question
        const question = await Question.findById(req.params.id);
        // check if current user posted the message
        if (question.userId === req.body.userId) {
            // if yes, update message
            await question.updateOne({
                $set: req.body
            });
            res.status(200).json("Your question has been updated")
        } else {
            res.status(403).json("You can updated only your questions")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a question
router.delete('/:id', async (req, res) => {
    try {
        // find the question
        const question = await Question.findById(req.params.id);
        // check if current user posted the message
        if (question.userId === req.body.userId) {
            // if yes, delete message
            await question.deleteOne();
            res.status(200).json("Your question has been deleted")
        } else {
            res.status(403).json("You can delete only your question")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// get a question
router.get("/:id", async (req, res) => {
    try {
        //compare id with the question id
        const question = await Question.findById(req.params.id);
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get timeline questions
router.get("/faq/:userId", async (req, res) => {
    try {
        // find correct user id
        const currentUser = await User.findById(req.params.userId);
        // fetch all current user's posts
        const userQuestions = await Question.find({
            userId: currentUser._id
        });
        // fetch all followings' posts
        const friendQuestions = await Promise.all(
            currentUser.following.map((friendId) => {
                return Question.find({
                    userId: friendId
                })
            })
        );
        res.json(userQuestions.concat(...friendQuestions));
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user's all questions
router.get("/profile/:username", async (req, res) => {
    try {
        // find correct user 
        const user = await User.findOne({username: req.params.username});
        // find all user's posts
        const questions = await Question.find({userId: user._id});
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json(err);
    }
});


// answer
router.post('/answer-question/:id', async (req, res) => {
    try {
        return Question.findByIdAndUpdate(req.params.id, {
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
router.delete('/delete-answer/:id', async (req, res) => {
    try {
        // find post
        const question = await Question.findByIdAndUpdate(req.params.id);
        // get comment id from the request
        const TheQuestion = req.body.commentId;
        console.log(question, TheQuestion)
        // get comment from question and filter to only keep the one comment to delete. valueOf to get the value of the object id in string
        const currentComment = question.comments.filter((comment) => TheQuestion === comment._id.valueOf())[0];
        // check if empty
        if (currentComment.length) {
            // if not, pull the comment from the data
            await Question.findByIdAndUpdate(req.params.id, {
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