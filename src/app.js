const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = 80;

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const error = require("./middleware/error");

app.use("/", authRouter, userRouter, profileRouter);
app.use(error);

connectDB()
  .then(() => {
    console.log("Dev Db connected...");
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(`Dev Db connection unsuccessful, Error: ${err}`));
