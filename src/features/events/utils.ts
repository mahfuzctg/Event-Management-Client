import { IEvent, EventStatus } from "@/types/event";
import dayjs from "dayjs";

/**
 * Calculate the current status of an event
 */
export const getEventStatus = (event: IEvent): EventStatus => {
  const now = dayjs();
  const start = dayjs(event.date);       
  const end = dayjs(event.endDate);      

  if (now.isBefore(start)) return "Upcoming";
  if (now.isAfter(end)) return "Past";
  return "Ongoing";
};

/**
 * Sort events by start date chronologically
 */
export const sortEventsChronologically = (events: IEvent[]): IEvent[] => {
  return [...events].sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf() 
  );
};
