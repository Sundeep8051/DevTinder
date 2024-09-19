const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  emailId: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  age: { type: Number, min: 18, max: 99, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
});

module.exports = mongoose.model("User", userSchema);
