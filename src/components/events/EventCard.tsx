"use client";

import React, { useState } from "react";
import { IEvent } from "@/types/event";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

dayjs.extend(utc);

interface EventCardProps {
  event: IEvent;
  status: "upcoming" | "ongoing" | "past";
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dxv10xebz/image/upload/v1739138568/default-event-placeholder.jpg";

const EventCard: React.FC<EventCardProps> = ({ event, status }) => {
  const start = dayjs.utc(event.date).format("DD MMM YYYY, h:mm A");
  const end = dayjs.utc(event.endDate).format("h:mm A");

  // Full background color for badge based on status using ShadCN palette
  const statusClass =
    status === "upcoming"
      ? "bg-rose-500 text-white"
      : status === "ongoing"
      ? "bg-emerald-500 text-white"
      : "bg-gray-500 text-white";

  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <Card className="flex flex-col rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden bg-white dark:bg-gray-900">
      <div className="relative h-52 w-full">
        <Image
          src={event.image || DEFAULT_IMAGE}
          alt={event.title}
          fill
          className="object-cover"
          onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
          priority
        />
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${statusClass}`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <CardHeader className="space-y-2 p-4">
        <CardTitle className="text-lg md:text-xl font-semibold line-clamp-1">{event.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {showFullDesc ? event.description : `${event.description.slice(0, 100)}...`}
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

      <CardContent className="mt-auto space-y-2 text-sm p-4">
        <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
          <CalendarDays className="w-4 h-4 text-rose-500" />
          <span>
            {start} - {end}
          </span>
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          <span className="font-medium">Location:</span> {event.location}
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
