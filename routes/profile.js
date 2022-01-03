const express = require("express");

//const { requireSignin, isAdmin } = require("../middlewares");
const {
  createProfile,
  dropProfile,
  alterProfile,
} = require("../controllers/profile");
const { requireSignin } = require("../middlewares");

const router = express.Router();

router.post("/profile/create", requireSignin, createProfile);
router.delete("/profile/:profileName", dropProfile);
router.put("/profile/", alterProfile);

module.exports = router;
