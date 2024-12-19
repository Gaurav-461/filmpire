// TMDB(The movies database)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "../config/config.js";

const tmdbApiKey = config.tmdbApiKey;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    //* Get Genres list
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //* Get movie by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get movie by search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get movies by category name
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get movies by genreID
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        //? If there is no searchQuery and no genreIdOrCategoryName, get popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    //* Get a movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    //* Get list
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
    }),

    //* Get user specific movie list
    getRecommendation: builder.query({
      query: ({ movie_id, list, page }) =>
        `/movie/${movie_id}/${list}?page=${page}&api_key=${tmdbApiKey}`,
    }),

    //* Get actor details
    getActorDetails: builder.query({
      query: (id) =>
        `/person/${id}?api_key=${tmdbApiKey}`,
    }),

    //* Get actor's movies
    getActorMovies: builder.query({
      query: ({id, page=1}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationQuery,
  useGetActorDetailsQuery,
  useGetActorMoviesQuery,
  useGetListQuery,
} = tmdbApi;
