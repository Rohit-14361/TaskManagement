const bcrypt = require("bcrypt");
const user = require("../models/user");

exports.generateHash = async (plainPassword) => {
  const salt = 10;
  try {
    const hashPassword = await bcrypt.hash(plainPassword, salt);
    return hashPassword;
  } catch (err) {
    console.log(err);
  }
};

exports.verifyPassword = async (password, encryptPassword) => {
  try {
    const comparePassword = await bcrypt.compare(password, encryptPassword);
    return comparePassword;
  } catch (err) {
    console.log(err);
  }
};
