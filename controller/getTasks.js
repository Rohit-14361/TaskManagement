const Todo = require("../models/todo");
const User = require("../models/user");

exports.getTask = async (req, res) => {
  try {
    // check  user from req.userId

    const userId = req.user.id;
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Invalid User",
      });
    }
    const user = await User.findById(userId).populate("todos");
    //     check if user was found or not
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks: user.todos, // Return the user's tasks
    });
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching tasks",
    });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(201).json({
      success: true,
      message: "Task fetched successfully",
      todos,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while fetching all todos",
    });
  }
};
