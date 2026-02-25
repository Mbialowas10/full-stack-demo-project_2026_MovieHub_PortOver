// src/components/MovieCard.tsx
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import type { MovieCardProps } from "../types/MovieCardProps";
import { useUser, useAuth } from "@clerk/clerk-react";






export const MovieCard = ({ movie }: MovieCardProps) => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const { 
    id, 
    original_title, 
    overview, 
    poster_path,
    popularity,
    vote_average,
    vote_count,
    release_date } = movie; // destructure movie props

  const image = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder.png";

  const [isFavourite, setIsFavourite] = useState(false); // not initially favourited or added to DB
  const [dbId, setDbId] = useState<number | null>(null); 

  // Check if the movie is already saved in the database
  useEffect(() => {
    const checkFavourite = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/movies?tmdbId=${id}`);
        const data = await res.json();

        if (data.movies && data.movies.length > 0) {
          setIsFavourite(true); // found in database, mark as favourite
          setDbId(data.movies[0].id); // store database ID for deletion
        }
      } catch (err) {
        console.error("Error checking favourite:", err);
      }
    };

    checkFavourite();
  }, [id]);

  // Toggle favourite
  const handleBtnClick = async () => {
  if (!user) {
    alert("Please login");
    return;
  }

  try {
    const token = await getToken();
    const res = await fetch("http://localhost:3000/api/v1/favourites", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tmdb_id: id,
        title: original_title,
        overview,
        poster_path,
        popularity,
        vote_average,
        vote_count,
        release_date,
      }),
    });

    const data = await res.json();
    setIsFavourite(data.isFavourite);
    if (data.favouriteId) setDbId(data.favouriteId);
  } catch (err) {
    console.error("Error toggling favourite:", err);
  }
};

  return (
    <div className="w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-base font-semibold text-slate-900">{original_title}</h1>

      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={image}
        alt={`${original_title} poster`}
        className="h-48 w-full"
        loading="lazy"
      />

      <p>{overview}</p>

      <div className="mt-4 flex justify-between items-center">
        <NavLink
          to="/reviews/new"
          className="text-blue-600 hover:underline"
          state={{ mname: original_title, image }}
        >
          Leave A Review...
        </NavLink>

        <button
          type="button"
          onClick={handleBtnClick}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {isFavourite ? "Remove from Favourites ➖" : "Add to Favourites ➕"}
        </button>
      </div>
    </div>
  );
};
