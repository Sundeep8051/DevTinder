const appRoutes = (app) => {
  app.use("/", (err, req, res, next) => {
    if (err) {
      res.status(500).send("Something went wrong");
    } else {
      next();
    }
  });
};

module.exports = appRoutes;
