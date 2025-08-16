import { useState } from "react";
import { loginAdmin } from "./api";
import { setToken, removeToken, isLoggedIn } from "./utils";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginAdmin({ email, password });
      setToken(res.token);
      setLoading(false);
      return res.user;
    } catch (err: any) {
      setError(err.message || "Login failed");
      setLoading(false);
      return null;
    }
  };

  const logout = () => {
    removeToken();
  };

  return { login, logout, loading, error, isLoggedIn: isLoggedIn() };
};
