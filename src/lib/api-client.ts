export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
