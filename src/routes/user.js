const User = require("../models/user");
const auth = require("../middleware/auth");

const express = require("express");

const userRouter = express.Router();

userRouter.get("/feed/:firstname", async (req, res) => {
  try {
    let name = req.params.firstname;
    let user = await User.findOne({ firstName: name });
    if (!user) res.status(404).send(`user with ${name} not found`);
    else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

userRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("no user found");
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

userRouter.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User details not found");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

userRouter.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send(`User with Id: ${userId} does not exist`);
    }
    res.status(200).send(`User: ${user.firstName} deleted successfully`);
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

module.exports = userRouter;
