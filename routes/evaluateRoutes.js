const express = require("express");
const {evaluate,getUserEvaluations,getHistory, getHistoryDetails} = require("../controllers/evaluateController.js");
const protect = require("../utils/authMiddleware.js")

const router = express.Router();

router.post("/",protect, evaluate);
router.get("/", protect, getUserEvaluations)
router.get("/history",protect, getHistory)
router.get("/history/:id", protect, getHistoryDetails)
module.exports = router;
