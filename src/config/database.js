const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sundeepmanibhushan:iMhNHP0WefkbTtMj@devdb.gefxy.mongodb.net/DevDb"
  );
};

module.exports = connectDB;
