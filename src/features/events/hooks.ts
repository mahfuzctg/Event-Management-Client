import useSWR from "swr";

import { getAllEvents } from "./api";

export const useEvents = () => {
  const { data, error, isLoading } = useSWR("/events", getAllEvents);
  return { events: data, error, isLoading };
};
