# alx-project-nexus

# Movie Recommendation App - MovieGo
A responsive web application that allows user to view trending, popular and upcoming movies, view detailed informatin about the movie. 

A user will also be able to save their favourites where they can come and refer to later. The app uses the TMDB (Movie Database) API and stores favourites using the browser's local storage. 

## Live Demo


## Features
 - Check trending and popular movies
 - view detailed information of the movie: cast, genre, ratings, runtime and more
 - Add or remove movies from favourites
 - Fast and responsive UI built with Tailwind CSS
 - Dynamic routing with Next.js for movie Details

 ## Tech Stack

 - Frontend: Next.js (Reat.js + Typescript)
 - Styling: Tailwind CSS
 - Data: TMDB API
 - State & Storage: Storage hooks + localStorage

 ## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Vegas90/alx-project-nexus.git
cd movie-app

### Install dependancies
npm install or yarn install

### Set up environment variables
Create a `.env.local` file in the root directory and add your TMDB API key:
```
TMDB_API_KEY=your_api_key_here
```
### 2. Run the app
```bash
npm run dev
``` 
## 3. Open your browser and go to `http://localhost:3000`

## Project Structure
```
movie-app/
├── components/          # Reusable components
├── pages/               # Next.js pages
├── public/              # Static assets
├── interfaces/           # TypeScript interfaces
├── styles/              # Global styles
├── utils/               # Utility functions
├── .env.local           # Environment variables  
├── package.json         # Project metadata and dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # Project documentation
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
├── .gitignore           # Git ignore file

```
### Environment Variables
- `TMDB_API_KEY`: Your TMDB API key for fetching movie data.

## Acknowledgements
- [TMDB API](https://www.themoviedb.org/documentation/api) for movie data
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for building user interfaces

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author
- Amos Mwoni
- Movie Recommendation App for the ALX Frontend Pro Certification Project

## Contact
For any inquiries or feedback, please reach out via email at [amosmwoni@gmail.com](mailto:amosmwoni@gmail.com)

## Screenshots


## Future Improvements
- Implement user authentication to save favourites on the server
- Add search functionality to find movies by title
- Improve error handling for API requests
- Optimize performance for large datasets
## Known Issues
- Some movie details may not be available due to API limitations
- Favourites are stored in local storage, which may not sync across devices
