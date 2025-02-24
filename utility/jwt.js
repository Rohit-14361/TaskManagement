const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

exports.createToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch (err) {
    console.log(err);
  }
};
