// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      lowercase: true, // Convert email to lowercase
      trim: true, // Remove whitespace
    },
    password: {
      type: String,
      required: true,
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task", // Reference to Task model
      },
    ],
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },

  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model("User ", userSchema);
