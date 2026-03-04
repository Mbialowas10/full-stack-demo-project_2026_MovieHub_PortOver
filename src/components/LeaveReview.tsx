// LeaveReview.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { API_BASE_URL } from "../api/config";

export const LeaveReview = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const { movie, image } = location.state || {};
  const movieName = movie?.title || "";
  const movieImage = image || "";

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to leave a review");
      return;
    }

    if (!movie) {
      alert("Movie data is missing!");
      return;
    }

    setLoading(true);

    try {
      // Get token from Clerk 
      const token = await getToken();
      const resp = await fetch(`${API_BASE_URL}/api/v1/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Clerk JWT
        },
        body: JSON.stringify({
          movie,
          rating: parseInt(rating),
          comment,
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Failed to post review: ${resp.status} ${errText}`);
      }

      const savedReview = await resp.json();
      console.log("Saved review:", savedReview);

      // Reset form
      setRating("");
      setComment("");
      navigate("/reviews");
    } catch (err: any) {
      console.error("Error submitting review:", err);
      alert(`Error submitting review: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    form: "max-w-lg mx-auto mt-8 rounded-xl bg-white p-6 shadow-md flex flex-col gap-4",
    input: "rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
    textarea: "rounded-md border border-gray-300 px-4 py-2 min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500",
    button: "self-end rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50",
    label: "text-sm font-medium text-gray-700",
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {movieName && <h2 className="text-xl font-semibold">{movieName}</h2>}
      {movieImage && <img src={movieImage} alt={movieName} className="w-full h-auto rounded mb-4" />}
      
      <label className={styles.label}>
        Rating
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className={styles.input}
          required
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{`⭐ ${num}`}</option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        Review
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.textarea}
          placeholder="What did you think about the movie?"
          required
        />
      </label>

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};