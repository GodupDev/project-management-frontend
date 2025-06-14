import { api } from './api';

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/notifications',
      providesTags: ['Notifications'],
    }),
    
    saveNotificationSettings: builder.mutation({
      query: (settings) => ({
        url: '/profiles/notification-settings', // Đảm bảo URL này chính xác
        method: 'PUT',
        body: { notificationSettings: settings }, // Đảm bảo định dạng này
      }),
      invalidatesTags: ['UserProfile', 'Notifications'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSaveNotificationSettingsMutation,
} = notificationApi;