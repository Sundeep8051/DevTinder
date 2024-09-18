const appRoutes = (app) => {
  app.use("/", (req, res, next) => {
    var token = "xyz";
    if (token == "xyz") {
      console.log("auth success");
      next();
    } else res.send("Unauthorized");
  });

  app.get("/user", (req, res) => {
    res.send({ FirstName: "Sundeep", LastName: "ManiBhushan" });
  });

  app.post("/user", (req, res) => {
    res.send(users);
  });

  app.use((req, res) => {
    res.send("Hello Node.js");
  });
};

module.exports = appRoutes;
