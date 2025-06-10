// Theme Constants
export const THEME_STORAGE_KEY = "app_theme";
export const DEFAULT_THEME = "light";

// Language Constants
export const LANGUAGE_STORAGE_KEY = "app_language";
export const DEFAULT_LANGUAGE = "vi";

// Auth Constants
export const AUTH_TOKEN_KEY = "token";
export const AUTH_USER_KEY = "user";

// Profile Constants
export const PROFILE_STORAGE_KEY = "user_profile";
export const AVATAR_STORAGE_KEY = "user_avatar";

// Sidebar Constants
export const SIDEBAR_STORAGE_KEY = "sidebar_state";
export const DEFAULT_SIDEBAR_STATE = "expanded";

// API Constants
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_COUNT = 3;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Lỗi kết nối mạng",
  SERVER_ERROR: "Lỗi máy chủ",
  AUTH_ERROR: "Lỗi xác thực",
  VALIDATION_ERROR: "Lỗi dữ liệu",
  UNKNOWN_ERROR: "Lỗi không xác định",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Đăng nhập thành công",
  LOGOUT_SUCCESS: "Đăng xuất thành công",
  UPDATE_SUCCESS: "Cập nhật thành công",
  DELETE_SUCCESS: "Xóa thành công",
  CREATE_SUCCESS: "Tạo thành công",
};
