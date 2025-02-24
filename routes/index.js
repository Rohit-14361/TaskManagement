const express = require("express");
const { Signup } = require("../controller/auth");
const { createTodo } = require("../controller/createTodo");
const router = express.Router();

router.post("/signup", Signup);
router.post("/createTask", createTodo);
module.exports = router;
