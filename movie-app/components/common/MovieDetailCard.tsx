// a component that displays a movie card with title, poster, and description
import Image from "next/image";
import Link from "next/link";
import { MovieCardDetailsProps } from "@/interfaces/index";

const MovieDetailCard = ({ id, title, poster_path, media_type, release_date }: MovieCardDetailsProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // TMDB poster path


 return (
    <Link href={`/movie/${id}`}>
      {/*Maintain the roundness of the container on hover */}
      <div className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105  transition-transform duration-300 bg-white">
        <Image
          src={`${imageBaseUrl}${poster_path}`}
          alt={title}
          width={500}
          height={750}
          className="w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          {/*display the media type if available*/}
          {media_type && (
            <p className="text-base text-gray-600 mb-0">{media_type.charAt(0).toUpperCase() + media_type.slice(1)}</p>
          )}
          <p className="text-sm text-gray-500 mt-0">{release_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieDetailCard;