//a interface for a movieCard showing the image, title, year and runtime
 
export interface MovieCardProps{
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    media_type?: string; // Optional, can be 'movie' or 'tv'
}

//an interface to fetch the movie by ID in the movie details page
export interface MovieCardDetailsProps {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    runtime: number; // in minutes
    genres: { id: number; name: string }[];
    vote_average: number; // average rating
    vote_count: number; // total votes
    media_type?: string; // Optional, can be 'movie' or 'tv'
    //the actors
    person_results: Array<{ name: string; character: string; }>;
}