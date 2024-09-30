const jwt = require("jsonwebtoken");
const User = require("../models/user");

// middleware for authentication
const auth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      res.status(404).send("Invalid token");
    } else {
      const id = jwt.verify(token, "Sundeep");
      const user = await User.findById(id);
      if (!user) res.status(404).send("User not found");
      else req.user = user;

      next();
    }
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
};

module.exports = auth;
