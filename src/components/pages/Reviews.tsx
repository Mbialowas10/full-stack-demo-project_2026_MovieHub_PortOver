import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import ReviewCard from "../ReviewCard";
import { API_BASE_URL } from "../../api/config";  

const Reviews = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = user
          ? `${API_BASE_URL}/api/v1/reviews/user/${user.id}`
          : `${API_BASE_URL}/api/v1/reviews`;

        const token = await getToken();
        const headers: HeadersInit = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(url, { headers });
        const data = await res.json();

        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("Data is not an array:", data);
          setReviews([]);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  if (loading) {
    return <h1 className="text-center mt-10 text-lg">Loading reviews...</h1>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-center text-2xl font-semibold mb-4">
        {user ? "Your Reviews" : "Recent User Reviews"}
      </h1>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            movie ={review.movie.title}
            name={review.user?.name || review.user?.email || review.userId}
            rating={review.rating}
            review={review.comment}
            createdAt={new Date(review.createdAt).toLocaleDateString()}
          />
        ))
      )}
    </div>
  );
};

export default Reviews;
