"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import EventForm from "@/components/events/EventForm";
import { getEventById, updateEvent } from "@/features/events/api";
import { getToken } from "@/features/auth/utils";
import { toast } from "react-hot-toast";
import { IEvent } from "@/types/event";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditEventModalPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = getToken() || "";

  const [initialData, setInitialData] = useState<Partial<IEvent> | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const formatDateTimeLocal = (dateStr: string) =>
    dateStr ? new Date(dateStr).toISOString().slice(0, 16) : "";

  // Fetch event data
  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        setFetching(true);
        const event = await getEventById(id);
        setInitialData({
          title: event.title,
          description: event.description,
          location: event.location,
          image: event.image,
          date: formatDateTimeLocal(event.date),
          endDate: formatDateTimeLocal(event.endDate),
        });
      } catch (err) {
        toast.error("Failed to load event data");
        router.push("/dashboard/events");
      } finally {
        setFetching(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Update event handler
  const handleUpdate = async (data: Partial<IEvent>) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        date: new Date(data.date!).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
      };
      await updateEvent(id!, payload, token);
      toast.success("Event updated successfully!");
      router.push("/dashboard/events");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30">
        <p className="text-white text-lg animate-pulse">Loading event...</p>
      </div>
    );

  if (!initialData)
    return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40 px-4">
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-auto max-h-[90vh] animate-slide-in">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => router.push("/dashboard/events")}
        >
          <X size={24} />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Edit Event
          </h2>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Update event details quickly and efficiently
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <EventForm
            onSubmit={handleUpdate}
            initialData={initialData}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
