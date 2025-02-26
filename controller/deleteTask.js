const User = require("../models/user");
const Todo = require("../models/todo");

exports.deleteTask = async (req, res) => {
  try {
    // fetch user Id
    const userId = req.user.id;

    if (userId) {
      // fetch task id and
      const { taskId } = req.body;
      if (!taskId) {
        return res.status(401).json({
          success: false,
          message: "Kindly Provide Task Id",
        });
      }

      const deleteTask = await Todo.findByIdAndDelete(taskId);
      if (!deleteTask) {
        return res.status(401).json({
          success: false,
          message: "Task not found",
        });
      }
      const updateTask = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { todos: taskId },
        },
        { new: true }
      )
        .populate("todos")
        .exec();
      // updateTask = updaeteTask.toObject();
      updateTask.password = undefined;

      return res.status(200).json({
        success: true,
        todos: updateTask,
      });
    }

    return res.status(403).json({
      success: false,
      messsage: "Token is Invalid",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while delete",
    });
  }
};
