const express = require("express");

//const { requireSignin, isAdmin } = require("../middlewares");
const { createUser, dropUser, alterUser} = require("../controllers/user");

const router = express.Router();

router.post("/user/create", createUser);
router.delete("/user/:username", dropUser);
router.post("/user/:username", alterUser);