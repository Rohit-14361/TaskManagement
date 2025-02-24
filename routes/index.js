const express = require("express");
const { Signup } = require("../controller/auth");
const { createTodo } = require("../controller/createTodo");
const { isAuth } = require("../middleware/isAuth");
const router = express.Router();

router.post("/signup", Signup);
router.post("/createTask", isAuth, createTodo);
module.exports = router;
