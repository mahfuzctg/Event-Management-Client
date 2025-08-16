import EventList from "@/components/events/EventList";
import { getAllEvents } from "@/features/events/api";

export const revalidate = 60; // ISR: regenerate every 60 seconds

export default async function EventsPage() {
  // Fetch all events from backend
  const events = await getAllEvents();

  // ✅ Debug: check what’s coming from backend
  console.log("Fetched events:", events);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col space-y-8">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      {events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <p>No events available.</p>
      )}
    </section>
  );
}
