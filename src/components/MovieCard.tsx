<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import type {MovieCardProps} from "../types/MovieCardProps"


export const MovieCard = ({ movieID, name, description, image }: MovieCardProps) => {

    const [isFavourite, setIsFavourite] = useState(false);
    const [favouriteId,setFavouriteId] = useState<number| null>(null);
    //const [loading,setLoading] = useState(false);



  // Check if movie is already favourited
  useEffect(() => {
  setIsFavourite(false);
  setFavouriteId(null);

  fetch(`http://localhost:4445/favourites?movieId=${movieID}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 1) {
        setIsFavourite(true);
        setFavouriteId(data[0].id);
      }
    });
}, [movieID]);


  // toggle favourite
  const handleBtnClick = async () => {
  try {
    if (isFavourite && favouriteId) {
      await fetch(`http://localhost:4445/favourites/${favouriteId}`, {
        method: "DELETE",
      });
      setIsFavourite(false);
      setFavouriteId(null);
    } else {
      const resp = await fetch("http://localhost:4445/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: movieID,
          m_name: name,
          image,
          m_favourited: true,
          createdAt: new Date().toISOString(),
        }),
      });

      const saved = await resp.json();
      setIsFavourite(true);
      setFavouriteId(saved.id);
    }
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-base font-semibold text-slate-900">{name}</h1>

      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        src={image}
        alt={`${name} poster`}
=======
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
    tmdb_id,
    original_title,
    title,
    name,
    overview,
    poster_path,
    popularity,
    vote_average,
    vote_count,
    release_date } = movie as any; // destructure movie props

  const displayTitle = original_title || title || name;
  const tmdbId = tmdb_id || id; // Handle both TMDB API and local DB objects

  const image = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder.png";

  const [isFavourite, setIsFavourite] = useState(false);
  const [isStoredLocally, setIsStoredLocally] = useState(false);
  const [dbId, setDbId] = useState<number | null>(null);

  // Check if the movie is already saved in the database and its favourite status
  useEffect(() => {
    const checkStatus = async () => {
      if (!tmdbId) return;
      try {
        const token = await getToken();
        const res = await fetch(`http://localhost:3000/api/v1/favourites/status/${tmdbId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const data = await res.json();

        setIsFavourite(data.isFavourite);
        setIsStoredLocally(data.isStoredLocally);
        if (data.favouriteId) setDbId(data.favouriteId);
      } catch (err) {
        console.error("Error checking favourite status:", err);
      }
    };

    checkStatus();
  }, [tmdbId, user, getToken]);

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
        tmdb_id: tmdbId,
        title: displayTitle,
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
    if (data.isFavourite) setIsStoredLocally(true);
    if (data.favouriteId) setDbId(data.favouriteId);
  } catch (err) {
    console.error("Error toggling favourite:", err);
  }
};

  return (
    <div className={`w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg ${isStoredLocally ? 'bg-amber-50' : 'bg-gray-100'}`}>
      <h1 className="text-base font-semibold text-slate-900">{displayTitle} {isStoredLocally && <span className="text-xs font-normal text-amber-600">(Stored Locally)</span>}</h1>

      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={image}
        alt={`${original_title} poster`}
>>>>>>> clerk
        className="h-48 w-full"
        loading="lazy"
      />

<<<<<<< HEAD
      <p>{description}</p>
=======
      <p>{overview}</p>
>>>>>>> clerk

      <div className="mt-4 flex justify-between items-center">
        <NavLink
          to="/reviews/new"
          className="text-blue-600 hover:underline"
<<<<<<< HEAD
          state={{mname:{name},image:{image}}}
=======
          state={{ mname: displayTitle, image }}
>>>>>>> clerk
        >
          Leave A Review...
        </NavLink>

        <button
          type="button"
          onClick={handleBtnClick}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
<<<<<<< HEAD
         { isFavourite ? "Remove from Favourites ➖" : "Add to Favourites ➕" }
=======
          {isFavourite ? "Remove from Favourites ➖" : "Add to Favourites ➕"}
>>>>>>> clerk
        </button>
      </div>
    </div>
  );
};
