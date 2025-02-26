const User = require("../models/user");
// const bcrypt = require("bcryptjs");
const { generateHash } = require("../utility/bcrypt");

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid",
      });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hashedPassword = await generateHash(password);

    // Ensure _id is not included in the update object
    const updateData = { name, email, password: hashedPassword };
    const updateUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User  not found",
      });
    }

    updateUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User  updated successfully",
      updateUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while updating user",
    });
  }
};
