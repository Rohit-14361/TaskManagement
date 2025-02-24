const bcrypt = require("bcrypt");

exports.generateHash = async (plainPassword) => {
  const salt = 10;
  try {
    const hashPassword = await bcrypt.hash(plainPassword, salt);
    return hashPassword;
  } catch (err) {
    console.log(err);
  }
};
