"use client";

import { IEvent } from "@/types/event";
import EventCard from "./EventCard";
import { Clock, CalendarDays, Archive } from "lucide-react";
import NotFoundEvents from "../common/NotFoundEvents";

interface EventCategorySectionProps {
  title: string;
  events: IEvent[];
  status: "ongoing" | "upcoming" | "past";
}

export default function EventCategorySection({ title, events, status }: EventCategorySectionProps) {
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
        <NotFoundEvents
          message={`No ${title.toLowerCase()} events available.`}
          Icon={Icon}
          colorClass={colorClass}
        />
      )}
    </div>
  );
}
