import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "../services/TMDB.js";
import genreOrCategoryReducer from '../features/currentGenreOrCategory.js'
import userReducer from '../features/authSlice.js'

export const store = configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
})