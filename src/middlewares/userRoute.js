const User = require("../models/user");
const validateUser = require("../helpers/validate-user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRoute = require("./authRoute");

const userRoute = (app) => {
  app.post("/signup", async (req, res) => {
    try {
      validateUser(req);

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

  app.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId });
      if (!user) res.status(404).send("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send("Invalid credentials");

      let token = await User.getJwt();

      res.cookie("token", token, { expires: new Date(Date.now() + 1000000) });
      res.send("Login successful");
    } catch (err) {
      res.status(400).send(`Error: ${err}`);
    }
  });

  app.get("/profile", authRoute, async (req, res) => {
    try {
      const user = req.user;
      if (!user) res.status(404).send("User not found");
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(`Error: ${err}`);
    }
  });

  app.get("/feed/:firstname", async (req, res) => {
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

  app.get("/feed", async (req, res) => {
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

  app.patch("/user", async (req, res) => {
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

  app.delete("/user", async (req, res) => {
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
};

module.exports = userRoute;
