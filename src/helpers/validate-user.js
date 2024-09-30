const validator = require("validator");

const ValidateSignUpUser = (req) => {
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

const ValidateEditUserModel = (req) => {
  const isAllowedValues = ["firstName", "lastName", "age", "about", "skills"];

  if (
    !Object.keys(req.body).every((field) => isAllowedValues.includes(field))
  ) {
    throw new Error("Invalid field in request body/Field not allowed to edit");
  }
};

module.exports = { ValidateSignUpUser, ValidateEditUserModel };
