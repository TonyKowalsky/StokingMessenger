import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = "https://api.giphy.com/v1";

export interface GiphyGif {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
    };
    downsized: {
      url: string;
      width: string;
      height: string;
    };
    preview_gif: {
      url: string;
      width: string;
      height: string;
    };
  };
}

interface GiphyResponse {
  data: GiphyGif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

interface SearchArgs {
  query: string;
  limit?: number;
  offset?: number;
}

interface TrendingArgs {
  limit?: number;
  offset?: number;
}

export const giphyApi = createApi({
  reducerPath: "giphyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    searchGifs: builder.query<GiphyResponse, SearchArgs>({
      query: ({ query, limit = 20 }) => ({
        url: "/gifs/search",
        params: {
          api_key: API_KEY,
          q: query,
          limit,
          rating: "g",
        },
      }),
    }),

    getTrendingGifs: builder.query<GiphyResponse, TrendingArgs>({
      query: ({ limit = 9 } = {}) => ({
        url: "/gifs/trending",
        params: {
          api_key: API_KEY,
          limit,
          rating: "g",
        },
      }),
    }),
  }),
});

export const { useSearchGifsQuery, useGetTrendingGifsQuery } = giphyApi;
