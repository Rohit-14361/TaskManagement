const Todo = require("../models/todo");
const User = require("../models/user");

exports.createTask = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.id; // fetch from payload of req.user

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create a new task with the createdBy field
    const newTask = await Todo.create({
      title,
      body,
      createdBy: userId, // Add the createdBy field
    });

    // Update the user model to include the new task ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { todos: newTask._id } }, // Push the new task ID into the todos array
      { new: true }
    )
      .populate("todos") // Assuming you want to populate the todos field
      .exec();

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User  not found",
      });
    }

    // Hide the password
    let userRes = updatedUser.toObject();
    userRes.password = undefined;
    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      userRes,
    });
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({
      // Send a response in case of an error
      success: false,
      message: "An error occurred while creating the task",
    });
  }
};
