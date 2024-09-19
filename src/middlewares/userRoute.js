const User = require("../models/user");

const userRoute = (app) => {
  app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    await user.save();
    res.send("User created successfully");
  });

  app.get("/feed/:firstname", async (req, res) => {
    let name = req.params.firstname;
    let user = await User.findOne({ firstName: name });
    if (!user) res.status(404).send(`user with ${name} not found`);
    else {
      res.status(200).send(user);
    }
  });

  app.get("/feed", async (req, res) => {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("no user found");
    } else {
      res.status(200).send(users);
    }
  });

  app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    if (!user) {
      res.status(404).send("User details not found");
    }
    res.status(200).send(user);
  });
};

module.exports = userRoute;
