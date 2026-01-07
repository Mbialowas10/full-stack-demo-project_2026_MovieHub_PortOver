import { useState, useEffect } from "react";
import ReviewCard from  "../ReviewCard"

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []); // empty array = fetch once on mount

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-center text-2xl font-semibold mb-4">Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            movie ={review.movie}
            name={review.name}
            rating={review.rating}
            review={review.review}
            createdAt={review.createdAt}
          />
        ))
      )}
    </div>
  );
};

export default Reviews;
