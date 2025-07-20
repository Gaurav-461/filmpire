# Filmpire

Cineverse is a modern web application for discovering, searching, and managing movies. It leverages the [TMDB API](https://www.themoviedb.org/documentation/api) to provide up-to-date movie information, genres, and user-specific features like favorites and watchlists.

## Features

- Browse popular, top-rated, and upcoming movies
- Search for movies by title
- Filter movies by genre or category
- View detailed information about each movie, including cast, trailer, and recommendations
- View actor profiles and their filmography
- User authentication via TMDB (login required for favorites/watchlist)
- Add or remove movies from your favorites and watchlist
- View your profile with your favorite and watchlist movies
- Responsive design with light/dark mode toggle

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [TMDB API Key](https://www.themoviedb.org/settings/api)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gaurav-461/filmpire.git
   cd filmpire
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your TMDB API key:
     ```env
     VITE_TMDB_API_KEY=your_tmdb_api_key_here
     ```

### Running the App
To start the development server:
```bash
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production
To build the app for production:
```bash
npm run build
# or
yarn build
```

To preview the production build:
```bash
npm run preview
# or
yarn preview
```

## Technologies Used
- [React](https://react.dev/) (with functional components and hooks)
- [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Material-UI (MUI)](https://mui.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for fast development and build
- [TMDB API](https://www.themoviedb.org/documentation/api) for movie data

## Folder Structure
- `src/components/` - UI components (Movies, MovieInformation, Actors, Profile, etc.)
- `src/features/` - Redux slices for state management
- `src/services/` - API logic (TMDB)
- `src/context/` - Theme and color mode context
- `src/assets/` - Images and genre icons
- `src/app/` - Redux store setup
- `src/config/` - Configuration files
- `src/utils/` - Utility functions

## License
This project is for educational purposes and is not affiliated with TMDB.
