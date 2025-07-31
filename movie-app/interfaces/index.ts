//a interface for a movieCard showing the image, title, year and runtime
 
export interface MovieCardProps{
    id: number;
    title: string;
    poster_path: string | null;
    runtime?: number | null;
    release_date: string;
    media_type?: string; // Optional, can be 'movie' or 'tv'
}
