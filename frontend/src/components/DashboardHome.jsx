import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

export default function DashboardHome() {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("Click 'Get Question' to start!");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState(null);

  const getQuestion = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic!");
      return;
    }
    setLoadingQuestion(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/questions/generate",
        { topic },
        { withCredentials: true }
      );
      setQuestion(res.data.question);
      setAnswer("");
      setFeedback(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch question");
    } finally {
      setLoadingQuestion(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please type your answer first!");
      return;
    }
    setEvaluating(true);
    setError(null);

    try {
      const evaluation = await axios.post(
        "http://localhost:4000/api/evaluate",
        { question, answer },
        { withCredentials: true }
      );
      setFeedback(evaluation.data);
    } catch (err) {
      setError(err.response?.data?.message || "Evaluation failed");
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
      {/* Topic & Question Section */}
      <motion.div
        className="bg-black border-2 border-l-blue-600 border-b-pink-600 border-r-blue-600 border-t-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl sm:text-2xl text-white font-bold mb-2">Topic</h3>
        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <h3 className="text-xl sm:text-2xl text-white font-bold mb-2">Question</h3>
        <p className="text-white mb-4">{question}</p>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={getQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition w-full sm:w-auto"
          disabled={loadingQuestion}
        >
          {loadingQuestion ? "Loading..." : "Get Question"}
        </button>
      </motion.div>

      {/* Answer Section */}
      <motion.div
        className="bg-black border-2 border-l-blue-600 border-b-pink-600 border-r-blue-600 border-t-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Your Answer</h3>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-3 border border-gray-300 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
          rows={5}
        />
        <button
          onClick={submitAnswer}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition w-full sm:w-auto"
          disabled={evaluating}
        >
          {evaluating ? "Evaluating..." : "Submit Answer"}
        </button>
      </motion.div>

      {/* Feedback Section */}
      {feedback && (
        <motion.div
          className="bg-black border-2 border-l-blue-600 border-b-pink-600 border-r-blue-600 border-t-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2 text-white">
            Feedback{" "}
            <FiCheckCircle
              className={`text-${
                feedback.score >= 8 ? "green" : feedback.score >= 5 ? "orange" : "red"
              }-500`}
            />
          </h3>
          <p
            className={`text-${
              feedback.score >= 8 ? "green" : feedback.score >= 5 ? "orange" : "red"
            }-600 font-semibold mb-2`}
          >
            Score: {feedback.score}/10
          </p>
          <p className="text-white mb-4">
            <strong>Feedback:</strong> {feedback.feedback}
          </p>
          <button
            onClick={() => {
              setAnswer("");
              setFeedback(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
