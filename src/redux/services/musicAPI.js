import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const musicApi = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-song-recognizer.p.rapidapi.com",

    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "ec49ee1146msh8af1cfc3c75dbbbp16168djsna1889bab30e2"
      );

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
  }),
});

export const {
  useGetSongsByCountryQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
} = musicApi;
