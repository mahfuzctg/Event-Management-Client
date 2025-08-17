"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/events/EventCard";
import { useEvents, useEventActions } from "@/features/events/hooks";
import { getToken } from "@/features/auth/utils";
import { getEventStatus } from "@/features/events/utils";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DashboardEventsPage() {
  const token = getToken() || "";
  const { events, isLoading, error } = useEvents();
  const { removeEvent } = useEventActions(token);
  const [search, setSearch] = useState("");

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const filteredEvents = events?.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setSelectedEventId(id);
    setIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEventId) return;
    try {
      await removeEvent(selectedEventId);
      toast.success("Event deleted successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete event!");
    } finally {
      setIsOpen(false);
      setSelectedEventId(null);
    }
  };

  if (isLoading)
    return <p className="p-6 text-center text-gray-500">Loading events...</p>;
  if (error)
    return (
      <p className="p-6 text-center text-red-500">
        Failed to load events. Please try again.
      </p>
    );
  if (!events || events.length === 0)
    return <p className="p-6 text-center text-gray-500">No events found.</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <Link href="/dashboard/events/create">
            <Button className="w-full sm:w-auto">Create Event</Button>
          </Link>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const status = getEventStatus(event);
          return (
            <div
              key={event._id}
              className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <EventCard event={event} status={status} />
              <div className="mt-4 flex gap-2 flex-wrap">
                <Link href={`/dashboard/events/${event._id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="flex-1 w-full sm:w-auto"
                  onClick={() => handleDeleteClick(event._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="py-2">
            Are you sure you want to delete this event? This action cannot be undone.
          </p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
