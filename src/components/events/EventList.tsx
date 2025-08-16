"use client";

import { IEvent } from "@/types/event";
import EventCard from "./EventCard";
import { getEventStatus, sortEventsChronologically } from "@/features/events/utils";

interface EventListProps {
  events: IEvent[];
}

export default function EventList({ events }: EventListProps) {
  const sortedEvents = sortEventsChronologically(events);

  if (!sortedEvents.length) return <p>No events found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedEvents.map((event) => (
        <EventCard key={event._id} event={event} status={getEventStatus(event)} />
      ))}
    </div>
  );
}
