const authRoute = (app) => {
  app.use("/", (req, res, next) => {
    var token = "xyz";
    if (token == "xyz") {
      console.log("authentication successful");
      next();
    } else res.send("Unauthorized");
  });
};

module.exports = authRoute;
