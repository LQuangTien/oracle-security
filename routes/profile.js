const express = require("express");

//const { requireSignin, isAdmin } = require("../middlewares");
const { createProfile, dropProfile, alterProfile} = require("../controllers/profile");

const router = express.Router();

router.post("/profile/create", createProfile);
router.delete("/profile/:profileName", dropProfile);
router.put("/profile/", alterProfile);

module.exports = router;