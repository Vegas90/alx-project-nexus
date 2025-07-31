import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import { MovieCardProps } from "@/interfaces/index"; 
import Layout from "@/components/Layout"; 
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: use icons


// Main page component to display trending movies

const HomePage = () => {
  //store fetched movie data
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  //state to manage loading state
  const [loading, setLoading] = useState(true);

  // TMDB API configuration
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch trending movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${TMDB_BASE_URL}/trending/all/week`, {
          params: {
            api_key: TMDB_API_KEY,
          },
        });
        //store the info in results 
        const data = res.data as { results: MovieCardProps[] };
        const results = data.results;
        setMovies(results);
        setLoading(false);
        //catch errors
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
// run the fetchMovies function when the component mounts
    fetchMovies();
  }, [TMDB_API_KEY]);

//---------------------------------
  //auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft +=1;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction:"left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({left:scrollAmount,behavior:"smooth"});
    }
  };

   return (
    <Layout>
      <main className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Trending This Week</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative">
            {/* Scroll buttons */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
              onClick={() => scroll("left")}
            >
              <ChevronLeft size={24} />
            </button>

            <div
              ref={scrollRef}
              className="truncate text-sm flex space-x-10 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-1"
            >
              {movies.map((movie) => (
                <div key={movie.id} className="min-w-[180px] max-[180px]:">
                  
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
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
      </main>
    </Layout>
  );
};

export default HomePage;