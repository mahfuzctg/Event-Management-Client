import EventsSection from "@/components/events/EventsSection";
import NoData from "@/components/common/NoData";
import { getAllEvents } from "@/features/events/api";

export const revalidate = 60;

export default async function EventsPage() {
  let events = [];

  try {
    events = await getAllEvents(); // fetch server-side
  } catch (error) {
    console.error("Failed to fetch events:", error);
    events = [];
  }

  const eventArray = Array.isArray(events) ? events : [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col space-y-8">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>

      {eventArray.length > 0 ? (
        <EventsSection events={eventArray} />
      ) : (
        <NoData message="No events available at the moment. Please check back later!" />
      )}
    </section>
  );
}
