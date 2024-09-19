const express = require("express");
const appRoutes = require("./middlewares/routes");
const connectDB = require("./config/database");
const authRoute = require("./middlewares/auth");
const userRoute = require("./middlewares/userRoute");

const app = express();

app.use(express.json());

const port = 80;

authRoute(app);
userRoute(app);
appRoutes(app);

connectDB()
  .then(() => {
    console.log("Dev Db connected...");
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(`Dev Db connection unsuccessful, Error: ${err}`));
