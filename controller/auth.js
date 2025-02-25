const User = require("../models/user");
const { generateHash, verifyPassword } = require("../utility/bcrypt");
const { createToken } = require("../utility/jwt");

exports.Signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: "false",
        message: "All fields are required",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }
    const hashPassword = await generateHash(password);
    let user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    //     create token and send
    const token = await createToken(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating user",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const user = req.body;
    if (!user.email || !user.password || !user.role) {
      return res.status(400).json({
        success: false,
        message: "Email and Password must be required",
      });
    }

    let existUser = await User.findOne({ email: user.email });

    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    //     verify password

    const comparePassword = await verifyPassword(
      user.password,
      existUser.password
    );
    if (comparePassword) {
      //     if password is correct then create the token
      const payload = {
        email: existUser.email,
        id: existUser._id,
        role: existUser.role,
      };
      const token = await createToken(payload, process.env.JWT_SECRET);
      user = user.toObject();
      user.password = undefined;
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is invalid",
      });
    }
  } catch (err) {
    console.log(err);
    console.log("Internal Server Error");
  }
};
