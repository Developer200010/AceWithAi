const {generateQuestion} = require("../utils/aiHelper.js");

const getQuestion = async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ message: "Topic is required" });
        }
        const question = await generateQuestion(topic);
        res.json({ topic, question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = getQuestion;