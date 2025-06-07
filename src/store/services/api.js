import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrentToken } from "../slices/authSlice";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = selectCurrentToken(getState());

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // Add common headers
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      return headers;
    },
  }),
  tagTypes: ["Project", "Task", "User"],
  endpoints: (builder) => ({}),
});
