"use client";

import React, { useState } from "react";
import { IEvent } from "@/types/event";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

dayjs.extend(utc);

interface EventCardProps {
  event: IEvent;
  status: "upcoming" | "ongoing" | "past";
}

const DEFAULT_IMAGE = "/default-event.jpg"; // Place a default image in public folder

const EventCard: React.FC<EventCardProps> = ({ event, status }) => {
  const start = dayjs.utc(event.date).format("DD MMM YYYY, h:mm A");
  const end = dayjs.utc(event.endDate).format("h:mm A");

  const statusColor =
    status === "upcoming" ? "default" : status === "ongoing" ? "secondary" : "outline";

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imgSrc, setImgSrc] = useState(event.image || DEFAULT_IMAGE);

  const toggleDescription = () => setShowFullDescription((prev) => !prev);

  return (
    <Card className="flex flex-col rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/70">
      
      {/* Event Image */}
      <div className="relative h-52 w-full md:h-64 lg:h-72">
        <Image
          src={imgSrc}
          alt={event.title}
          fill
          className="object-cover"
          onError={() => setImgSrc(DEFAULT_IMAGE)}
          priority
        />
        {/* Status badge overlay */}
        <Badge
          variant={statusColor}
          className="absolute top-3 right-3 uppercase px-3 py-1 text-xs"
        >
          {status}
        </Badge>
      </div>

      <CardHeader className="space-y-2 p-4">
        <CardTitle className="text-xl font-bold line-clamp-1">{event.title}</CardTitle>

        <CardDescription className="text-sm text-muted-foreground">
          {showFullDescription ? event.description : event.description.slice(0, 120) + (event.description.length > 120 ? "..." : "")}
          {event.description.length > 120 && (
            <button
              className="ml-2 text-rose-500 font-medium hover:underline"
              onClick={toggleDescription}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-2 text-sm p-4">
        <p>
          <span className="font-medium">Date:</span> {start} - {end}
        </p>
        <p>
          <span className="font-medium">Location:</span> {event.location || "TBA"}
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
