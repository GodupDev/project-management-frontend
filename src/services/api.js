import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrentToken } from "../store/slices/authSlice";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = selectCurrentToken(getState());
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["UserProfile", "User"],
  endpoints: () => ({}),
});
