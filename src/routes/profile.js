const express = require("express");
const auth = require("../middleware/auth");
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

module.exports = profileRouter;
