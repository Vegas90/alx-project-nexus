// The actual button logic: add/remove movie to localStorage, show "Favourited" if already saved.

// components/FavoriteButton.tsx

// components/FavoriteButton.tsx

import { useEffect, useState } from "react";
import { addToFavorites, isInFavorites, removeFromFavorites } from "@/utils/localStorage";
import { MovieCardProps } from "@/interfaces/index";

interface FavoriteButtonProps {
  movie: MovieCardProps;
  onFavoriteChange?: () => void; // optional callback to refresh parent
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isInFavorites(movie.id));
  }, [movie.id]);

  const handleClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
      setIsFavorite(false);
      onFavoriteChange?.(); // notify parent if needed
    } else {
      addToFavorites(movie);
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 mt-2 rounded ${
        isFavorite ? "bg-gray-500 text-white" : "bg-yellow-400 text-black"
      }`}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;

