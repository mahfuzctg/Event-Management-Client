import { fetcher } from "@/lib/api-client";

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
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};
