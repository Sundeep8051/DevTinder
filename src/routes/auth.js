const User = require("../models/user");
const { ValidateSignUpUser } = require("../helpers/validate-user");
const bcrypt = require("bcrypt");
const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    ValidateSignUpUser(req);

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) res.status(404).send("User not found");

    const isMatch = await user.validatePassword(password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    let token = await user.getJwt();

    res.cookie("token", token, { expires: new Date(Date.now() + 1000000) });
    res.json(user);
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User logged out successfully");
});

module.exports = authRouter;
