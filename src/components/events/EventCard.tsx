"use client";

import React, { useState } from "react";
import { IEvent } from "@/types/event";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";

// ✅ extend dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface EventCardProps {
  event: IEvent;
  status: "Upcoming" | "Ongoing" | "Past";
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dxv10xebz/image/upload/v1739138568/default-event-placeholder.jpg";

const EventCard: React.FC<EventCardProps> = ({ event, status }) => {
  // ✅ detect visitor timezone
  const visitorTZ = dayjs.tz.guess();

  // ✅ convert event times to visitor’s local timezone
  const start = dayjs.utc(event.date).tz(visitorTZ).format("DD MMM YYYY, h:mm A");
  const end = dayjs
    .utc(event.endDate)
    .tz(visitorTZ)
    .format("h:mm A");

  const statusClass =
    status === "Upcoming"
      ? "bg-rose-500 text-white"
      : status === "Ongoing"
      ? "bg-emerald-500 text-white"
      : "bg-gray-500 text-white";

  const [showFullDesc, setShowFullDesc] = useState(false);

  const safeImage =
    event.image && event.image.startsWith("http") ? event.image : DEFAULT_IMAGE;

  return (
    <Card className="flex flex-col rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden bg-white dark:bg-gray-900">
      {/* Event Image */}
      <div className="relative h-52 w-full">
        <Image
          src={safeImage}
          alt={event.title || "Event image"}
          fill
          className="object-cover"
          priority
        />
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${statusClass}`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Event Title & Description */}
      <CardHeader className="space-y-2 p-4">
        <CardTitle className="text-lg md:text-xl font-semibold line-clamp-1">
          {event.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {showFullDesc
            ? event.description
            : `${event.description.slice(0, 100)}...`}
        </CardDescription>
        {event.description.length > 100 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900"
            onClick={() => setShowFullDesc(!showFullDesc)}
          >
            {showFullDesc ? "Read Less" : "Read More"}
          </Button>
        )}
      </CardHeader>

      {/* Event Date & Location */}
      <CardContent className="mt-auto space-y-2 text-sm p-4">
        <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
          <CalendarDays className="w-4 h-4 text-rose-500" />
          <span>
            {start} - {end} <br />
            <span className="text-xs text-muted-foreground">
              ({visitorTZ})
            </span>
          </span>
        </p>
        <p className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>
            <span className="font-medium">Location:</span> {event.location}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
