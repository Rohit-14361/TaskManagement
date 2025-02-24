const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Server is connected to db"))
    .catch((er) => {
      console.log(er);
      console.log("Error while connected to db ");
      process.exit(1);
    });
};

module.exports = db;
