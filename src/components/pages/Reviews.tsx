import { useState, useEffect } from "react";
import ReviewCard from  "../ReviewCard"

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("Data is not an array:", data);
          setReviews([]);
        }
      })
      .catch((err) => console.error(err));
  }, []); // empty array = fetch once on mount

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-center text-2xl font-semibold mb-4">User Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            movie ={review.movie.title}
            name={review.user?.email || review.userId}
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
