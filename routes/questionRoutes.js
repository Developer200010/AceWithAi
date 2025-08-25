const express = require("express");
const  getQuestion  = require("../controllers/questionController");
const protect =require("../utils/authMiddleware")
const router = express.Router();

router.post("/generate",protect, getQuestion);

module.exports = router;
