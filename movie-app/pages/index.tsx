// pages/index.tsx
import TrendingMovies from "@/components/sections/TrendingMovies";
import PopularMovies from "@/components/sections/PopularMovies";
import UpcomingMovies from "@/components/sections/UpcomingMovies";

const HomePage = () => {
  return (
    <main>
      <TrendingMovies />
      <PopularMovies />
      <UpcomingMovies />
    </main>
  );
};

export default HomePage;
