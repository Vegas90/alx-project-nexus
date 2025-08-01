import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieDetailCard from "@/components/common/MovieDetailCard";
import { MovieCardDetailsProps } from "@/interfaces/index";
import { useRouter } from "next/dist/client/components/navigation";

const MovieDetailPage = () => {
   const router = useRouter(); //gets the movie ID from the URL
    const { id } = router.query;//pick id from the URL
    const [movie, setMovie] = useState<MovieCardDetailsProps | null>(null);
    const [loading, setLoading] = useState(true);

    // TMDB API configuration
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_BASE_URL = "https://api.themoviedb.org/3";


    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!id) return; // Ensure id is available
          
            try {
                const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
                    params: { api_key: TMDB_API_KEY,
                        append_to_response: "credits"   // This gives us cast info too
                     },
                });

    const data = response.data;

    //extract top 5 cast members
    const actors = data.credits.cast.slice(0, 5).map((person: { name: string; character: string }) => ({
        name: person.name,
        character: person.character,
    }));

    //Structure the data into MovieCardDetailsProps format
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

                setMovie(movieDetails);//save above to movie state
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }

    ;
        // Fetch movie details when id is available
        fetchMovieDetails();
    }, [id, TMDB_API_KEY]);

    if (loading) return <p className="p-4">Loading...</p>

    //handle movie not found
    if (!movie) return <p className="p-4">Movie not found</p>;

    return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster image */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-md w-full md:w-64"
        />

        {/* Movie Info Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 mb-2">
            {movie.release_date} • {movie.runtime} min
          </p>
          <p className="text-yellow-500 mb-4">
            ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
          </p>

          {/* Genre List */}
          <div className="mb-4">
            <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
          </div>

          {/* Description */}
          <p className="mb-6">{movie.overview}</p>

          {/* Cast List */}
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
        </div>
      </div>
    </div>
  );

export default MovieDetailPage;