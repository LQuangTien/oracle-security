const express = require("express");

const {
  validateSignin,
  isAuthValidated,
} = require("../BLL/validate");
const { requireSignin } = require("../middlewares");
const { signin, signout } = require("../controllers/auth");

const router = express.Router();

router.post("/signin", validateSignin, isAuthValidated, signin);
router.post("/signout", requireSignin, signout);

module.exports = router;
