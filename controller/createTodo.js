const Todo = require("../models/todo");

const User = require("../models/user");

exports.createTodo = async (req, res) => {
  try {
    const { title, body, user } = req.body;
    const createTodo = new Todo({
      title,
      body,
      user,
    });
    user.password = undefined;
    const newTodo = await createTodo.save();
    const updateTodo = await User.findByIdAndUpdate(
      user,
      {
        $push: { todos: newTodo._id },
      },
      { new: true }
    )
      .populate("todos")
      .exec();
    return res.json({
      user: updateTodo,
    });
  } catch (err) {
    console.log(err);
    console.log("Error while creating todo");
  }
};
