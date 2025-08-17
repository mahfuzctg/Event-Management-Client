import useSWR, { mutate } from "swr";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "./api";
import { IEvent } from "@/types/event";

/**
 * Get events (auto revalidates via SWR)
 */
export const useEvents = () => {
  const { data, error, isLoading } = useSWR("/events", getAllEvents);
  return { events: data, error, isLoading };
};

/**
 * Event actions (CRUD helpers)
 */
export const useEventActions = (token: string) => {
  const addEvent = async (payload: Partial<IEvent>) => {
    await createEvent(payload, token);
    mutate("/events"); // revalidate cache
  };

  const editEvent = async (id: string, payload: Partial<IEvent>) => {
    await updateEvent(id, payload, token);
    mutate("/events");
  };

  const removeEvent = async (id: string) => {
    await deleteEvent(id, token);
    mutate("/events");
  };

  return { addEvent, editEvent, removeEvent };
};
