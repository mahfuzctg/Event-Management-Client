"use client";

import { IEvent } from "@/types/event";
import EventCard from "./EventCard";
import { getEventStatus, sortEventsChronologically } from "@/features/events/utils";

interface EventsSectionProps {
  events: IEvent[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  if (!events.length) {
    return <p>No events found.</p>;
  }

  const sortedEvents = sortEventsChronologically(events);

  // Group events by status
  const ongoingEvents = sortedEvents.filter((e) => getEventStatus(e) === "Ongoing");
  const upcomingEvents = sortedEvents.filter((e) => getEventStatus(e) === "Upcoming");
  const pastEvents = sortedEvents.filter((e) => getEventStatus(e) === "Past");

  const renderSection = (title: string, events: IEvent[], status: "ongoing" | "upcoming" | "past") => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} status={status} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No {title.toLowerCase()} events.</p>
      )}
    </div>
  );

  return (
    <div className="space-y-12">
      {renderSection("Ongoing Events", ongoingEvents, "ongoing")}
      {renderSection("Upcoming Events", upcomingEvents, "upcoming")}
      {renderSection("Past Events", pastEvents, "past")}
    </div>
  );
}
