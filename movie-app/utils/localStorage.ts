// utils/localStorage.ts

import { MovieCardProps } from "@/interfaces/index";

const FAVORITES_KEY = "favoriteMovies";

// Get favorites from localStorage
export const getFavorites = (): MovieCardProps[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Add movie to favorites
export const addToFavorites = (movie: MovieCardProps): void => {
  const favorites = getFavorites();
  // Prevent duplicates by checking if movie already exists
  const alreadyExists = favorites.some((fav) => fav.id === movie.id);
  if (alreadyExists) return;

  const updatedFavorites = [...favorites, movie];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

// Remove movie from favorites using its ID
export const removeFromFavorites = (id: number): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((movie) => movie.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

// Check if movie is already favorited
export const isInFavorites = (id: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((movie) => movie.id === id);
};


