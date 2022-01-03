const express = require("express");

const { requireSignin } = require("../middlewares");
const { signin, signout,allAdminPrivs } = require("../controllers/auth");

const router = express.Router();

router.post("/signin", signin);
router.post("/signout", requireSignin, signout);
router.get("/admin-privs", requireSignin, allAdminPrivs);

module.exports = router;
