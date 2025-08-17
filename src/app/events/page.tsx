import { Suspense } from "react";
import EventsSection from "@/components/events/EventsSection";
import NoData from "@/components/common/NoData";
import EventsSkeleton from "@/components/events/EventsSkeleton";
import { getAllEvents } from "@/features/events/api";
import { IEvent } from "@/types/event";

export const revalidate = 60;

async function EventsContent() {
  let events: IEvent[] = [];

  try {
    events = await getAllEvents();
  } catch (error) {
    console.error("Failed to fetch events:", error);
    events = [];
  }

  const eventArray = Array.isArray(events) ? events : [];

  return eventArray?.length > 0 ? (
    <EventsSection events={eventArray} />
  ) : (
    <NoData message="No events available at the moment. Please check back later!" />
  );
}

export default function EventsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col space-y-8">
      {/* Professional & eye-catching title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center 
        text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary 
        animate-fadeIn">
        Explore Our Exciting Events
      </h1>

      <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
        Discover Upcoming, Ongoing, and Past events. Stay updated and never miss an opportunity to participate in your favorite events.
      </p>

      <Suspense fallback={<EventsSkeleton />}>
        {/* Async event content */}
        <EventsContent />
      </Suspense>
    </section>
  );
}
