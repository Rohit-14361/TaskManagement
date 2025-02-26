const express = require("express");
const { Signup, Login } = require("../controller/Auth");
const { createTask } = require("../controller/createTodo");
const { User, authenticateUser, Admin } = require("../middleware/isAuth");
const { getAllTask, getTask } = require("../controller/getTasks");
const { updateTask } = require("../controller/updateTodo");
const { deleteTask } = require("../controller/deleteTask");
const { updateUser } = require("../controller/updateUser");
const { getUsers } = require("../controller/getUsers");
// const { isAuth } = require("../middleware/isAuth");
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/createTask", authenticateUser, User, createTask);
router.delete("/deleteTask", authenticateUser, User, deleteTask);
router.get("/getTask", authenticateUser, User, getTask);
router.get("/getAllTask", authenticateUser, Admin, getAllTask);
router.put("/updateUser", authenticateUser, User, updateUser);
// switch user to admin
router.get("/getUsers", authenticateUser, User, getUsers);
router.put("/updateTask", authenticateUser, User, updateTask);
module.exports = router;
