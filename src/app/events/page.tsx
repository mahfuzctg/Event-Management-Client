// File: src/app/events/page.tsx
import EventList from "@/components/events/EventList";
import NoData from "@/components/common/NoData";
import { getAllEvents } from "@/features/events/api";

export const revalidate = 60;

export default async function EventsPage() {
  let events = [];
  try {
    events = await getAllEvents();
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col space-y-8">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>

      {events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <NoData message="There are currently no events to display. Please check back later!" />
      )}
    </section>
  );
}
