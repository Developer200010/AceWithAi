import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/evaluate/history",
          { withCredentials: true }
        );
        setHistory(res.data.history);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p className="text-center py-6">Loading history...</p>;
  if (!history.length)
    return <p className="text-center py-6">No history yet.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {history.map((item) => (
        <div
          key={item._id}
          className="bg-black text-white border-2 border-l-blue-600 border-b-pink-600 border-r-blue-600 border-t-white p-4 rounded-2xl shadow hover:shadow-lg transition break-words w-full"
        >
          <p className="mb-2">
            <strong>Topic:</strong> {item.topic}
          </p>
          <p className="mb-2 line-clamp-3">
            <strong>Question:</strong> {item.question}
          </p>
          <p className="mb-2 line-clamp-3">
            <strong>Your Answer:</strong> {item.answer}
          </p>
          <Link
            to={`/dashboard/history/${item._id}`}
            className="mt-2 inline-block text-blue-400 hover:underline"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
