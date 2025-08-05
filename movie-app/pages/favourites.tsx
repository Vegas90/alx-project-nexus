// pages/FavoritesPage.tsx

import { useEffect, useState } from "react";
import { getFavorites } from "@/utils/localStorage";
import { MovieCardProps } from "@/interfaces/index";
import MovieCard from "@/components/common/MovieCard";
import FavoriteButton from "@/components/common/FavoriteButton";


const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<MovieCardProps[]>([]);

  const loadFavorites = () => {
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  };

  useEffect(() => {
    loadFavorites(); // load on mount
  }, []);

  return (

      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Your Favorite Movies</h1>

        {favorites.length === 0 ? (
          <p>You havent added any favorite movies yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 scale-90">
            {favorites.map((movie) => (
              <div key={movie.id}>
                <MovieCard {...movie} />
                <FavoriteButton movie={movie} onFavoriteChange={loadFavorites} />
              </div>
            ))}
          </div>
        )}
      </div>
  );
};

export default FavoritesPage;
