const OpenAI = require("openai");
require("dotenv").config()
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})


const generateQuestion = async (topic) => {
    console.log(topic)
    try {
        const prompt = `Generate one interview question about ${topic}. 
    Keep it clear, professional, and suitable for a beginner to intermediate developer. 
    Return only the question, no extra text.`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
        })
        const question = response.choices[0].message.content.trim();
        return question;
    } catch (error) {
        console.error("❌ AI Error:", error.message);
        throw new Error("Failed to generate question");
    }
}

const evaluateAnswer = async (question, answer) => {
    try {
        const prompt = `
    Interview Question: ${question}
    Candidate Answer: ${answer}

    Task: Evaluate the answer on a scale of 1 to 10.
    - Provide a numeric score.
    - Give concise feedback (max 3 sentences).
    Return JSON only in this format:
    {
      "score": <number>,
      "feedback": "<text>"
    }
    `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200,
            response_format: { type: "json_object" }
        });
        return JSON.parse(response.choices[0].message.content.trim());
    } catch (error) {
        console.error("❌ AI Error (evaluateAnswer):", err.message);
        throw new Error("Failed to evaluate answer");
    }
}

module.exports = {generateQuestion, evaluateAnswer};
