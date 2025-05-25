export const userProfile = {
  id: "1",
  fullName: "Nguyễn Trọng Tiến",
  email: "tien.nguyen@example.com",
  avatar: "https://i.pravatar.cc/150?img=1",
  role: "Admin",
  department: "Engineering",
  location: "Ho Chi Minh City",
  phone: "+84 123 456 789",
  bio: "Experienced project manager with a passion for delivering high-quality software solutions.",
  joinedDate: "2023-01-15",
  lastActive: "2024-01-20T10:30:00Z",
};

export const notificationPreferences = {
  email: {
    dailyDigest: true,
    taskUpdates: true,
    projectUpdates: true,
    mentions: true,
    comments: true,
  },
  push: {
    taskUpdates: true,
    projectUpdates: true,
    mentions: true,
    comments: true,
  },
  desktop: {
    taskUpdates: true,
    projectUpdates: true,
    mentions: true,
    comments: true,
  },
};

export const appearanceSettings = {
  theme: "light",
  language: "en",
  fontSize: "medium",
  density: "comfortable",
  colorScheme: "blue",
};

export const securitySettings = {
  twoFactorEnabled: false,
  twoFactorMethod: "authenticator",
  sessionTimeout: 30,
  loginNotifications: true,
  passwordLastChanged: "2023-12-01",
};

export const privacySettings = {
  profileVisibility: "team",
  showEmail: true,
  showPhone: false,
  showActivity: true,
  showLocation: true,
};

export const timeZoneSettings = {
  timezone: "Asia/Ho_Chi_Minh",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24h",
  weekStartsOn: "monday",
};

// Export all settings as a single object
export const settings = {
  userProfile,
  notificationPreferences,
  appearanceSettings,
  securitySettings,
  privacySettings,
  timeZoneSettings,
};
