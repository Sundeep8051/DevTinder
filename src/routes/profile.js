const express = require("express");
const auth = require("../middleware/auth");
const { ValidateEditUserModel } = require("../helpers/validate-user");
const profileRouter = express.Router();

profileRouter.get("/profile", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) res.status(404).send("User not found");
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

profileRouter.patch("/profile/edit", auth, async (req, res) => {
  try {
    ValidateEditUserModel(req);
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    loggedInUser.save();

    res
      .status(200)
      .json({ message: `User updated successfully`, Status: loggedInUser });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
