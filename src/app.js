const express = require("express");
const appRoutes = require("./middlewares/routes");
const connectDB = require("./config/database");

const app = express();

const port = 80;

const users = [];

appRoutes(app);

connectDB()
  .then(() => {
    console.log("Dev Db connected...");
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(`Dev Db connection unsuccessful, Error: ${err}`));
