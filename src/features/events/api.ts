import { fetcher } from "@/lib/api-client";
import { IEvent } from "@/types/event";

export const getAllEvents = async (): Promise<IEvent[]> => {
  return fetcher<IEvent[]>("/events"); // GET /events from backend
};
