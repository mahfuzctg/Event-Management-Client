import { IEvent, EventStatus } from "@/types/event";
import dayjs from "dayjs";

export const getEventStatus = (event: IEvent): EventStatus => {
  const now = dayjs();
  const start = dayjs(event.startDate);
  const end = dayjs(event.endDate);

  if (now.isBefore(start)) return "upcoming";
  if (now.isAfter(end)) return "past";
  return "ongoing";
  
};

export const sortEventsChronologically = (events: IEvent[]): IEvent[] => {
  return events.sort((a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf());
};
