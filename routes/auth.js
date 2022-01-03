const express = require("express");

const { requireSignin } = require("../middlewares");
const { signin, signout } = require("../controllers/auth");

const router = express.Router();

router.post("/signin", signin);
router.post("/signout", requireSignin, signout);

module.exports = router;
