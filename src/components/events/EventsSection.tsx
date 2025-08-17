"use client";

import { IEvent } from "@/types/event";
import { getEventStatus, sortEventsChronologically } from "@/features/events/utils";
import EventsSkeleton from "./EventsSkeleton";
import EventCategorySection from "./EventCategorySection";

import { CalendarDays } from "lucide-react";
import NotFoundEvents from "../common/NotFoundEvents";

interface EventsSectionProps {
  events: IEvent[];
  isLoading?: boolean;
}

export default function EventsSection({ events, isLoading }: EventsSectionProps) {
  if (isLoading) return <EventsSkeleton />;

  if (!events?.length)
    return <NotFoundEvents
      message="No events found. Please check back later!"
      Icon={CalendarDays}
      colorClass="text-blue-500"
    />;

  const sortedEvents = sortEventsChronologically(events);
  const ongoingEvents = sortedEvents.filter((e) => getEventStatus(e) === "Ongoing");
  const upcomingEvents = sortedEvents.filter((e) => getEventStatus(e) === "Upcoming");
  const pastEvents = sortedEvents.filter((e) => getEventStatus(e) === "Past");

  return (
    <div className="space-y-12">
      <EventCategorySection title="Ongoing Events" events={ongoingEvents} status="ongoing" />
      <EventCategorySection title="Upcoming Events" events={upcomingEvents} status="upcoming" />
      <EventCategorySection title="Past Events" events={pastEvents} status="past" />
    </div>
  );
}
