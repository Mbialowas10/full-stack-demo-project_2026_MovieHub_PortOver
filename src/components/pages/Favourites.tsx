import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { MovieCard } from "../MovieCard";

const Favourites = () => {
  const { user } = useUser();
  const [favourites, setFavourites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchFavourites = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/favourites/user/${user.id}`);
        const data = await res.json();
        setFavourites(data.favourites || []);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user]);

  if (!user) {
    return <h1 className="text-center mt-10">Please sign in to view your favourites.</h1>;
  }

  if (loading) {
    return <h1 className="text-center mt-10">Loading favourites...</h1>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mt-8">Your Favourites</h1>
      {favourites.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">You haven't favourited any movies yet.</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {favourites.map((fav) => (
            <MovieCard key={fav.movie.id} movie={fav.movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
