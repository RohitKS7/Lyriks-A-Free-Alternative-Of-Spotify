import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const musicApi = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-song-recognizer.p.rapidapi.com",

    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPID_API_KEY);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongsByCountry: builder.query({
      query: (countryCode) =>
        `/top_country_tracks?country_code=${countryCode}&limit=100`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `/track_about?track_id=${songId}`,
    }),
    getRelatedSongs: builder.query({
      query: (songId) => `/related_tracks?track_id=${songId}&limit=10`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?query=${searchTerm}&limit=10`,
    }),
  }),
});

export const {
  useGetSongsByCountryQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetSongsBySearchQuery,
} = musicApi;
