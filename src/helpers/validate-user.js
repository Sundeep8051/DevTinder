const validator = require("validator");

const ValidateUser = (req) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Required first name and last name");
  }

  if (firstName.length < 4 || firstName.length > 30) {
    throw new Error("First name should be between 4 and 30 characters long");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  if (age < 18 || age > 100) {
    throw new Error("Age should be between 18 and 100");
  }

  if (!validator.isIn(gender, ["Male", "Female", "Other"])) {
    throw new Error("Invalid gender");
  }
};

module.exports = ValidateUser;
