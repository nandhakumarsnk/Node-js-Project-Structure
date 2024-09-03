// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      validate: {
        validator: function (value) {
          // Custom password validation
          return (
            /[0-9]/.test(value) && // Must contain at least one number
            /[a-z]/.test(value) && // Must contain at least one lowercase letter
            /[A-Z]/.test(value) && // Must contain at least one uppercase letter
            /[@$!%*?&#]/.test(value)
          ); // Must contain at least one special character
        },
        message:
          "Password must contain a number, a lowercase letter, an uppercase letter, and a special character",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
