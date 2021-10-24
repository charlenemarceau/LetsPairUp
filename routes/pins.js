const router = require("express").Router();
const Pin = require("../models/Pin");

//create a pin
router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
      const savedPin = await newPin.save();
      res.status(200).json(savedPin);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get all pins
  router.get("/", async (req, res) => {
    try {
      const pins = await Pin.find();
      res.status(200).json(pins);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // delete a pin
router.delete('/:id', async (req, res) => {
  try {
      // find the post
      const pin = await Pin.findById(req.params.id);
      // check if current user posted the message
      if (pin.userId === req.body.userId) {
          // if yes, delete message
          await pin.deleteOne();
          res.status(200).json("Your pin has been deleted")
      } else {
          res.status(403).json("You can delete only your pins")
      }
  } catch (err) {
      res.status(500).json(err)
  }
})
  module.exports = router;