"use client";

import { useEffect, useState } from "react";
import { getAllEvents } from "@/features/events/api";
import { IEvent } from "@/types/event";
import { getEventStatus, sortEventsChronologically } from "@/features/events/utils";

export default function EventList() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents();
      console.log("Events in component:", data); // 👈 Debug here
      setEvents(sortEventsChronologically(data));
    };
    fetchEvents();
  }, []);

  if (!events.length) {
    return <p>No events found.</p>;
  }

  return (
    <div>
      {events.map((event) => (
        <div key={event._id} className="border p-4 mb-2 rounded">
          <h2 className="text-lg font-bold">{event.title}</h2>
          <p>Status: {getEventStatus(event)}</p>
          <p>
            {new Date(event.startDate).toLocaleString()} -{" "}
            {new Date(event.endDate).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
