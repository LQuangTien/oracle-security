const express = require("express");

const { requireSignin } = require("../middlewares");
const { signin, signout } = require("../controllers/auth");

const router = express.Router();

router.post("/admin/signout", requireSignin, signout);
router.post("/admin/signin", signin);

module.exports = router;
