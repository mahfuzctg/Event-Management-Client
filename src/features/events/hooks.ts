// src/features/events/hooks.ts
import useSWR, { mutate } from "swr";
import { IEvent } from "@/types/event";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "./api";

/**
 * Fetch all events reactively
 */
export const useEvents = () => {
  const { data, error, isLoading } = useSWR<IEvent[]>("/events", getAllEvents);

  // refetch function using SWR's mutate
  const refetch = () => mutate("/events");

  return { events: data || [], error, isLoading, refetch };
};

/**
 * Event actions with immediate frontend update
 */
export const useEventActions = (token: string) => {
  const addEvent = async (payload: Partial<IEvent>) => {
    const newEvent = await createEvent(payload, token);
    mutate("/events", (events: IEvent[] = []) => [...events, newEvent], false);
    return newEvent;
  };

  const editEvent = async (id: string, payload: Partial<IEvent>) => {
    const updatedEvent = await updateEvent(id, payload, token);
    mutate(
      "/events",
      (events: IEvent[] = []) => events.map((e) => (e._id === id ? updatedEvent : e)),
      false
    );
    return updatedEvent;
  };

  const removeEvent = async (id: string) => {
    await deleteEvent(id, token);
    mutate("/events", (events: IEvent[] = []) => events.filter((e) => e._id !== id), false);
  };

  return { addEvent, editEvent, removeEvent };
};
