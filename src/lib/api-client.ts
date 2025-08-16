// File: src/lib/api-client.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Generic fetcher for API requests
 */
export async function fetcher<T>(url: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${url}`, { cache: "no-store" });

    if (!res.ok) {
      console.warn(`Failed to fetch ${url}: ${res.statusText}`);
      return {} as T;
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return {} as T;
  }
}
