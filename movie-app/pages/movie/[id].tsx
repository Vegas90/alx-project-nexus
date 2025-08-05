import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { MovieCardDetailsProps } from "@/interfaces/index";
import FavoriteButton from "@/components/common/FavoriteButton";

const MovieDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<MovieCardDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id || Array.isArray(id)) return;

      try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
          params: {
            api_key: TMDB_API_KEY,
            append_to_response: "credits",
          },
        });

        type TMDBMovieResponse = {
          id: number;
          title: string;
          overview: string;
          poster_path: string;
          release_date: string;
          runtime: number;
          genres: { id: number; name: string }[];
          vote_average: number;
          vote_count: number;
          credits: {
            cast: { name: string; character: string }[];
          };
        };

        const data = response.data as TMDBMovieResponse;

        const actors = data.credits.cast
          .slice(0, 5)
          .map((person: { name: string; character: string }) => ({
            name: person.name,
            character: person.character,
          }));

        const movieDetails: MovieCardDetailsProps = {
          id: data.id,
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          release_date: data.release_date,
          runtime: data.runtime,
          genres: data.genres,
          vote_average: data.vote_average,
          vote_count: data.vote_count,
          media_type: "movie",
          person_results: actors,
        };

        setMovie(movieDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, TMDB_API_KEY]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!movie) return <p className="p-4">Movie not found</p>;

  return (
  <div className="p-6 max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Poster on the Left */}
      <div className="md:w-1/3">
        <Image
          width={300}
          height={450}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-md w-full md:w-64"
        />
      </div>

      {/* Details on the Right */}
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-600 mb-1">
          {movie.release_date} • {movie.runtime} min
        </p>
        <p className="text-yellow-500 mb-4">
          ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
        </p>

        {/* Genres */}
        <div className="mb-4">
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </div>

        {/* Overview */}
        <p className="mb-6">{movie.overview}</p>

        {/* Main Cast */}
        <div>
          <strong>Main Cast:</strong>
          <ul className="list-disc list-inside mt-2">
            {movie.person_results.map((actor, index) => (
              <li key={index}>
                {actor.name} as <span className="italic">{actor.character}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* a button to favourite the movie */}
        <div className="mt-6">
          <FavoriteButton movie={movie} />
        </div>
      </div>
    </div>
  </div>
);

};

export default MovieDetailPage;


  