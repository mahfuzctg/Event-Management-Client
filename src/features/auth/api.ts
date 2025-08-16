
import { API_BASE } from "@/lib/api-client";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

/**
 * Admin login API
 */
export const loginAdmin = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || "Invalid credentials");
  }

  return response.json();
};
