// api.ts
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Make sure this is set in your .env.local
const BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined in environment variables');
}

/**
 * Fetch data helper with error handling.
 */
async function fetcher(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch trending movies — can be daily or weekly trending.
 */
export async function fetchTrendingMovies(timeWindow: 'day' | 'week' = 'day') {
  const url = `${BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}&language=en-US`;
  return fetcher(url);
}

/**
 * Fetch detailed info for a movie by ID
 */
export async function fetchMovieDetails(movieId: number) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`;
  return fetcher(url);
}

/**
 * Example for fetching recommended movies based on a movie ID
 */
export async function fetchRecommendedMovies(movieId: number) {
  const url = `${BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=en-US`;
  return fetcher(url);
}
