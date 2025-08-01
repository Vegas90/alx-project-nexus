import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "@/components/common/MovieCard";
import { MovieCardProps } from "@/interfaces/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrendingMovies = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null); // to get width of one card

  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${TMDB_BASE_URL}/trending/all/week`, {
          params: { api_key: TMDB_API_KEY },
        });
        const data = res.data as { results: MovieCardProps[] };
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [TMDB_API_KEY]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth + 40; // 40 = space-x-10 margin (10 * 4px)
        scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });

        // Optional: stop scrolling at the end
        const maxScrollLeft =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        if (scrollRef.current.scrollLeft >= maxScrollLeft - cardWidth) {
          scrollRef.current.scrollLeft = 0; // Loop back to start
        }
      }
    }, 2000); // Adjust timing (e.g., 2s between cards)

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth + 40;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 font-mono ">Trending This Week</h2>
      {/* Add a line after trending this week */}
      <hr className="border-t border-gray-300 my-4" />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="text-sm flex space-x-10 overflow-x-auto scrollbar-hide py-4 px-1"
          >
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                ref={index === 0 ? cardRef : null}
                className="min-w-[180px] max-w-[180px] text-sm truncate"
              >
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  media_type={movie.media_type}
                  // Format release_date to show only the year
                  release_date={new Date(movie.release_date).getFullYear().toString()}
                />
              </div>
            ))}
          </div>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingMovies;
