import { Suspense } from "react";
import EventsSection from "@/components/events/EventsSection";
import NoData from "@/components/common/NoData";
import EventsSkeleton from "@/components/events/EventsSkeleton";
import { getAllEvents } from "@/features/events/api";

export const revalidate = 60;

async function EventsContent() {
  let events = [];

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
      <h1 className="text-3xl font-bold mb-6">All Events</h1>

      <Suspense fallback={<EventsSkeleton />}>
        {/* Async event content */}
        <EventsContent />
      </Suspense>
    </section>
  );
}
