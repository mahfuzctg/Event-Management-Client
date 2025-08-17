"use client";

import { IEvent } from "@/types/event";
import EventCard from "./EventCard";
import { getEventStatus, sortEventsChronologically } from "@/features/events/utils";
import EventsSkeleton from "./EventsSkeleton";
import { Clock, CalendarDays, Archive } from "lucide-react"; // icons

interface EventsSectionProps {
  events: IEvent[];
  isLoading?: boolean;
}

export default function EventsSection({ events, isLoading }: EventsSectionProps) {
  if (isLoading) {
    return <EventsSkeleton />;
  }

  if (!events?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <CalendarDays className="w-20 h-20 text-muted-foreground animate-pulse" />
        <h2 className="text-2xl font-bold text-foreground">No Events Found</h2>
        <p className="text-muted-foreground text-center max-w-md">
          There are currently no events to display. Check back later for upcoming events!
        </p>
      </div>
    );
  }

  const sortedEvents = sortEventsChronologically(events);

  const ongoingEvents = sortedEvents.filter((e) => getEventStatus(e) === "Ongoing");
  const upcomingEvents = sortedEvents.filter((e) => getEventStatus(e) === "Upcoming");
  const pastEvents = sortedEvents.filter((e) => getEventStatus(e) === "Past");

  const renderSection = (
    title: string,
    events: IEvent[],
    status: "ongoing" | "upcoming" | "past"
  ) => {
    let Icon;
    let colorClass;
    switch (status) {
      case "ongoing":
        Icon = Clock;
        colorClass = "text-green-500";
        break;
      case "upcoming":
        Icon = CalendarDays;
        colorClass = "text-blue-500";
        break;
      case "past":
        Icon = Archive;
        colorClass = "text-gray-400";
        break;
      default:
        Icon = CalendarDays;
        colorClass = "text-muted-foreground";
    }

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Icon className={`w-6 h-6 ${colorClass}`} />
          {title}
        </h2>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} status={status} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 space-y-2 bg-background/50 border border-border/50 rounded-lg">
            <Icon className={`w-16 h-16 ${colorClass} animate-pulse`} />
            <p className="text-muted-foreground text-center">
              No {title.toLowerCase()} events available at the moment.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {renderSection("Ongoing Events", ongoingEvents, "ongoing")}
      {renderSection("Upcoming Events", upcomingEvents, "upcoming")}
      {renderSection("Past Events", pastEvents, "past")}
    </div>
  );
}
