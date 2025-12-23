const ReviewCard = ({ name, rating, review, movie }) => {
  return (
    <div className="border p-4 rounded mb-4 shadow-sm bg-gray-50">
      {movie && <h3 className="font-semibold text-lg">{movie}</h3>}
      <p className="text-sm text-gray-600">By {name}</p>
      <p>Rating: {rating} ⭐</p>
      <p className="mt-2">{review}</p>
    </div>
  );
};

export default ReviewCard;
