
import { fetcher } from "@/lib/api-client";
import { IEvent } from "@/types/event";

/**
 * Get all events from backend
 * Returns an empty array if API fails or returns invalid data
 */
export const getAllEvents = async (): Promise<IEvent[]> => {
  try {
    const data = await fetcher<IEvent[]>("/events");
    if (!Array.isArray(data)) return []; // fallback
    return data;
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return [];
  }
};
