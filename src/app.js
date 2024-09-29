const express = require("express");
const cookieParser = require("cookie-parser");

const appRoutes = require("./middlewares/appRoutes");
const connectDB = require("./config/database");
const authRoute = require("./middlewares/authRoute");
const userRoute = require("./middlewares/userRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = 80;

//authRoute(app);
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
