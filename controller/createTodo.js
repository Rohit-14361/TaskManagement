const Todo = require("../models/todo");

const User = require("../models/user");

// redux ->user

exports.createTodo = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is required",
      });
    }
    const { title, body } = req.body;

    const createTodo = new Todo({
      title,
      body,
    });

    const newTodo = await createTodo.save();
    if (!newTodo) {
      return res.json({
        success: false,
        message: "Internal server error while creating todo",
      });
    }
    user.todos.push(newTodo._id);
    await user.save();

    return res.json({
      user: updateTodo,
    });
  } catch (err) {
    console.log(err);
    console.log("Error while creating todo");
  }
};

// models:-
// user--->name,email,password,todos     task---->userId,title
// controller-> signup body(fetch) bcyrpt token cookies,body,headers ->token(id)
// createTodo-> id (token)
