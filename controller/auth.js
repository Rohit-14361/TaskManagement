const User = require("../models/user");
const { generateHash } = require("../utility/bcrypt");
const { createToken } = require("../utility/jwt");

exports.Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    //   check user exist or not
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        success: false,
        message: "User already Exist",
      });
    }

    //   encrypt the password
    const hashPassword = await generateHash(password);
    //   create db
    const newUser = await User.collection.insertOne({
      name,
      email,
      password: hashPassword,
    });
    // making password secure (encrypted format)
    const payload = {
      name,
      email,
      id: newUser.insertedId,
    };

    //   generate token
    const Token = await createToken(payload);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser,
      Token,
    });
  } catch (err) {
    console.log(err);
    console.log("Error while creating the Error");
  }
};
