// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User ", // Reference to User model
      required: true,
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model("Task", taskSchema);
