const express = require("express");

const {
  validateSignin,
  isAuthValidated,
} = require("../BLL/validate");
const { requireSignin } = require("../middlewares");
const { signin, signout } = require("../controllers/auth");

const router = express.Router();

router.post("/admin/signout", requireSignin, signout);
router.post("/admin/signin", validateSignin, isAuthValidated, signin);


module.exports = router;
