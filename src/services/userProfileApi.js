import { api } from "./api";

export const userProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Lấy thông tin profile của user hiện tại
    getProfile: builder.query({
      query: () => ({
        url: "profiles/me",
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),

    // Lấy thông tin profile của user khác
    getUserProfile: builder.query({
      query: (userId) => ({
        url: `profiles/${userId}`,
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),

    // Cập nhật thông tin profile
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "profiles",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["UserProfile"],
    }),

    // Cập nhật avatar
    updateAvatar: builder.mutation({
      query: (formData) => ({
        url: "profiles/avatar",
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
} = userProfileApi;
