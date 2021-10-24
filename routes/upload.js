const router = require("express").Router();
const User = require('../models/User');
const fs = require('fs');
const multer = require('multer');
const upload = multer();
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../Utils/errors.utils');

router.post("/", async (req, res) => {
    try {
      if (
      // accept only jpg, png and jpeg
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      )
        throw Error("invalid file");
      // check size, only less than 500000
      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({errors});
    }
    // image name will be the user's username and file will changed automatically without creating new file
    // unique username so unique fileName for avatars
    const fileName = req.body.name + ".jpg"; 
    // create path for file
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/profil/${fileName}`
      )
    );
    try {
      await User.findByIdAndUpdate(
        req.body.userId,
        { $set : {
            avatar: "./uploads/profil/" + fileName
          }},
        { new: true,
          upsert: true,
          setDefaultsOnInsert: true},
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(400).send({ message: err });
        }
      );
    } catch (err) {
      return res.status(500).json(err);
    }
})

module.exports = router;
