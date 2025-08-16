
"use client";

import React from "react";
import { IEvent } from "@/types/event";
import dayjs from "dayjs";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="max-w-md mx-auto shadow hover:shadow-lg transition-shadow">
      {event.image && (
        <div className="relative h-48 w-full">
          <Image src={event.image} alt={event.title} fill className="object-cover rounded-t-lg" />
        </div>
      )}
      <CardContent>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <p className="text-sm mt-2">
          <strong>Date:</strong> {dayjs(event.startDate).format("DD MMM YYYY, h:mm A")} - {dayjs(event.endDate).format("h:mm A")}
        </p>
        <p className="text-sm">
          <strong>Location:</strong> {event.location}
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
