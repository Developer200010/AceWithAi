const Evaluation = require("../models/evaluationModel.js");
const db = require("../config/DB.js");
const { evaluateAnswer } = require("../utils/aiHelper"); // ✅ your AI helper
const connectDB = require("../config/DB.js");

// POST /api/evaluate → evaluate answer + save in DB
const evaluate = async (req, res) => {
  try {
    await db()
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // console.log(req.user, "inside evController")
    // 🔮 Get AI evaluation from helper
    const evaluationResult = await evaluateAnswer(question, answer);
    // evaluationResult should return something like: { feedback: "...", score: 7 }

    // 💾 Save to DB
    const savedEvaluation = await Evaluation.create({
      user: req.user.id,
      question,
      answer,
      feedback: evaluationResult.feedback || "No feedback provided",
      score: evaluationResult.score || "no score"
    });

    res.json({
      question,
      answer,
      ...evaluationResult, // merges feedback + score
      _id: savedEvaluation._id,
      createdAt: savedEvaluation.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/evaluate → get all evaluations for logged-in user
const getUserEvaluations = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const evaluations = await Evaluation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getHistory = async (req, res) => {
  try {
    await connectDB()
    const history = await Evaluation.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "history is fetched successfully",
      history
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

const getHistoryDetails = async (req, res) => {
  try {
    await connectDB();
    const eval = await Evaluation.findById(req.params.id).populate("user");
    if (!eval) return res.status(404).json({ message: "Evaluation not found" });
    // Compare ObjectId as string
    if (eval.user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json({ eval });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { evaluate, getUserEvaluations, getHistory, getHistoryDetails };
