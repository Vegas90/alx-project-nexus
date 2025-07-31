// a component that displays a movie card with title, poster, and description
import Image from "next/image";
import Link from "next/link";
import { MovieCardProps } from "@/interfaces/index"; // Adjust the import path as necessary

const MovieCard = ({ id, title, poster_path, runtime }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // TMDB poster path


 return (
    <Link href={`/movie/${id}`}>
      <div className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 bg-white">
        <Image
          src={`${imageBaseUrl}${poster_path}`}
          alt={title}
          width={500}
          height={750}
          className="w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          {runtime && (
            <p className="text-sm text-gray-600">Runtime: {runtime} mins</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;