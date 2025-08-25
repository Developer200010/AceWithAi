import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function HistoryDetail() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/evaluate/history/${id}`,
          { withCredentials: true }
        );
        setEvaluation(res.data.eval);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (!evaluation) return <p>Evaluation not found.</p>;

  return (
    <div className="bg-black border-2 border-l-blue-600 border-b-pink-600 border-r-blue-600 border-t-white text-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{evaluation.topic}</h2>
      <p>
        <strong>Question:</strong> {evaluation.question}
      </p>
      <p className="mt-2">
        <strong>Your Answer:</strong> {evaluation.answer}
      </p>
      <p className="mt-2 font-semibold">
        <strong>Score:</strong> {evaluation.score}/10
      </p>
      <p className="mt-2">
        <strong>Feedback:</strong> {evaluation.feedback}
      </p>
      <Link
        to="/dashboard/history"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        Back to History
      </Link>
    </div>
  );
}
