// pages/index.tsx
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchTrendingMovies } from '../utils/api'; // adjust import path if needed

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrending() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch {
        setError('Failed to fetch movies. Check your API key and connection.');
      } finally {
        setLoading(false);
      }
    }

    loadTrending();
  }, []);

  if (loading) return <p>Loading trending movies...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Trending Movies</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ marginBottom: '1.5rem' }}>
            <h2>{movie.title}</h2>
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                style={{ borderRadius: '8px' }}
              />
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
