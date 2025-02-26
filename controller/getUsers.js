const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const validUser = await User.findById(userId);
    if (validUser) {
      const users = await User.find().populate("todos").exec();
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Invalid user",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while  fetching",
    });
  }
};
