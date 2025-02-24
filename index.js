const express = require("express");
const app = express();

// middleware
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// dotenv
const dotenv = require("dotenv");
dotenv.config();
// cors
const cors = require("cors");
app.use(cors());
// database configuration
const db = require("./config/index");
db();
// route
const userRoute = require("./routes/index");
app.use("/v1", userRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening to the PORT ${process.env.PORT}`);
});
