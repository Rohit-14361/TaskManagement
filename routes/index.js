const express = require("express");
const { Signup, Login } = require("../controller/Auth");
const { createTask } = require("../controller/createTodo");
const { User, authenticateUser } = require("../middleware/isAuth");
// const { isAuth } = require("../middleware/isAuth");
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/createTask", authenticateUser, User, createTask);
module.exports = router;
