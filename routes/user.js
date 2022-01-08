const express = require("express");

//const { requireSignin, isAdmin } = require("../middlewares");
const { createUser, dropUser, alterUser} = require("../controllers/user");
const { requireSignin } = require("../middlewares");

const router = express.Router();

router.post("/user/create",requireSignin, createUser);
router.delete("/user/:username",requireSignin, dropUser);
router.put("/user/",requireSignin, alterUser);

module.exports = router;