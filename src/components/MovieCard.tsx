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
        className="h-48 w-full"
        loading="lazy"
      />

      <p>{description}</p>

      <div className="mt-4 flex justify-between items-center">
        <NavLink
          to="/reviews/new"
          className="text-blue-600 hover:underline"
          state={{mname:{name},image:{image}}}
        >
          Leave A Review...
        </NavLink>

        <button
          type="button"
          onClick={handleBtnClick}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
         { isFavourite ? "Remove from Favourites ➖" : "Add to Favourites ➕" } 
        </button>
      </div>
    </div>
  );
};
