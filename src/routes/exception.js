const express = require("express");

const exceptionRouter = express.Router();

exceptionRouter.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  } else {
    next();
  }
});

module.exports = exceptionRouter;
