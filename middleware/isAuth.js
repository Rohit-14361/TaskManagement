// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Adjust the path as necessary
const { decodeToken } = require("../utility/jwt");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]; // Assuming the token is sent in the Authorization header

    if (!token || token === undefined) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const tokenInfo = await decodeToken(token, process.env.JWT_SECRET);
    if (!tokenInfo) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = tokenInfo;
    console.log(req.user);
    // req.user = await User.findById(decoded.id);
    // Verify the token

    // check user enrty exist in database or not
    // const user = await User.findById(tokenInfo.id);

    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "User  not found" });
    // }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while veriyfing the token",
    });
  }
};

exports.User = async (req, res, next) => {
  try {
    if (req.user.role === "User") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "This route is restricted to User only",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.Admin = async (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "This route is restricted to Admin Only",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
