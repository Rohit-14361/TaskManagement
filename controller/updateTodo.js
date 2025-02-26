const User = require("../models/user");
const Todo = require("../models/todo");

exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the request

    // Fetch new task data from req.body
    const { title, body, taskId } = req.body;
    if (!title || !body || !taskId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required while updating the task",
      });
    }

    // check user is valid or not
    const existUser = await User.findById(userId);
    if (existUser) {
      // Check if the task exists
      const existingTask = await Todo.findById(taskId);
      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      // Update the existing task
      const updatedTask = await Todo.findByIdAndUpdate(
        taskId,
        { $set: { title, body, createdBy: userId } }, // Update fields
        { new: true } // Return the updated document
      );

      updatedTask.password = undefined;
      return res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        updatedTask,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid User",
      });
    }
  } catch (err) {
    console.error("Error updating task:", err); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Error while updating the task",
    });
  }
};
