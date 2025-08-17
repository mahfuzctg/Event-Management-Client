"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/events/EventCard";
import { useEvents, useEventActions } from "@/features/events/hooks";
import { getEventStatus } from "@/features/events/utils";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import EventsSkeleton from "@/components/events/EventsSkeleton";
import EventForm, { EventFormData } from "@/components/events/EventForm";
import { getToken } from "@/features/auth/utils";
import { createEvent } from "@/features/events/api";

export default function DashboardEventsPage() {
  const token = getToken() || "";
  const { events, isLoading, error, refetch } = useEvents();
  const { removeEvent } = useEventActions(token);
  const [search, setSearch] = useState("");

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Create modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const filteredEvents = events?.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Delete
  const handleDeleteClick = (id: string) => {
    setSelectedEventId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEventId) return;
    try {
      console.log("Deleting event with ID:", selectedEventId);
      await removeEvent(selectedEventId);
      toast.success("Event deleted successfully!");
      refetch();
    } catch (err: any) {
      console.error("Error deleting event:", err);
      toast.error(err?.message || "Failed to delete event!");
    } finally {
      setIsDeleteOpen(false);
      setSelectedEventId(null);
    }
  };

  // Handle Create
  const handleCreate = async (data: EventFormData) => {
    try {
      setCreating(true);
      console.log("Creating event with payload:", data);
      const response = await createEvent(data, token);
      console.log("Event creation response:", response);
      toast.success("Event created successfully!");
      setIsCreateOpen(false);
      refetch(); // refresh event list
    } catch (err: any) {
      console.error("Error creating event:", err);
      // If backend sends response data, log it
      if (err.response) {
        console.error("Backend error response:", err.response);
      }
      toast.error(err?.message || "Failed to create event");
    } finally {
      setCreating(false);
    }
  };

  if (isLoading) return <EventsSkeleton />;
  if (error) {
    console.error("Error fetching events:", error);
    return (
      <p className="p-6 text-center text-red-500">
        Failed to load events. Please try again.
      </p>
    );
  }
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
          <Button className="w-full sm:w-auto" onClick={() => setIsCreateOpen(true)}>
            Create Event
          </Button>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents?.map((event) => {
          const status = getEventStatus(event);
          return (
            <div
              key={event._id}
              className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <EventCard event={event} status={status} />
              <div className="mt-4 flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  className="flex-1 w-full sm:w-auto"
                  onClick={() =>
                    (window.location.href = `/dashboard/events/${event._id}`)
                  }
                >
                  Edit
                </Button>
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

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="py-2">
            Are you sure you want to delete this event? This action cannot be undone.
          </p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Event Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <EventForm onSubmit={handleCreate} loading={creating} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
