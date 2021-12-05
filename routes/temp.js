const express = require("express");
const router = express.Router();
const { get } = require("../controllers/temp.js");

router.get("/temp", get);

module.exports = router;
