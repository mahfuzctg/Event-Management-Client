"use client";

import EventList from "./EventList";
import { IEvent } from "@/types/event";

interface EventsSectionProps {
  events: IEvent[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  if (!events.length) {
    return <p>No events found.</p>;
  }

  return <EventList events={events} />;
}
