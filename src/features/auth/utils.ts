import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

/**
 * Save JWT in cookie
 */
export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); // 1 day
};

/**
 * Get JWT from cookie
 */
export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

/**
 * Remove JWT (logout)
 */
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = () => !!getToken();
