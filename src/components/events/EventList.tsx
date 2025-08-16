"use client";

import React from "react";
import EventCard from "./EventCard";
import { IEvent } from "@/types/event";
import { getEventStatus, sortEventsChronologically } from "@/features/events/utils";

interface EventListProps {
  events: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const sorted = sortEventsChronologically(events);

  const categorized = {
    ongoing: sorted.filter(e => getEventStatus(e) === "ongoing"),
    upcoming: sorted.filter(e => getEventStatus(e) === "upcoming"),
    past: sorted.filter(e => getEventStatus(e) === "past"),
  };

  return (
    <div className="space-y-8">
      {Object.entries(categorized).map(([status, list]) => (
        <div key={status}>
          <h2 className="text-2xl font-semibold capitalize mb-4">{status} Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.length > 0 ? list.map(event => <EventCard key={event._id} event={event} />) : <p>No {status} events.</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
