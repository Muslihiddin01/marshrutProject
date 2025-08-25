import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => `routes?_embed=cars`,
    }),
    getDataById: builder.query({
      query: (id) => `routes/${id}?_embed=cars`,
    }),
  }),
});

export const { useGetDataQuery, useLazyGetDataByIdQuery } = api;
