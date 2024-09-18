const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sundeepmanibhushan:iMhNHP0WefkbTtMj@devdb.gefxy.mongodb.net/?retryWrites=true&w=majority&appName=DevDb"
  );
};

module.exports = connectDB;
