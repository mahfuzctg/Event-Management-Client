import { fetcher } from "@/lib/api-client";
import { IEvent } from "@/types/event";

/**
 * Get all events from backend
 */
export const getAllEvents = async (): Promise<IEvent[]> => {
  try {
    const data = await fetcher<{ success: boolean; events: IEvent[] }>("/events");
    console.log("Fetched events:", data); // 👈 Debug here
    return data?.events || [];
  } catch (error) {
    console.error("Error fetching events:", error); // 👈 Debug errors
    return [];
  }
};
