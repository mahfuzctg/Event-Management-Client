"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEventActions } from "@/features/events/hooks";
import { getEventById } from "@/features/events/api";
import EventForm from "@/components/events/EventForm";
import { getToken } from "@/features/auth/utils";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams();
  const token = getToken() || "";
  const { editEvent } = useEventActions(token);
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    getEventById(id).then(setEventData).catch(console.error);
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setLoading(true);
    try {
      await editEvent(id, data);
      router.push("/dashboard/events");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!eventData) return <p className="p-6">Loading event...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <EventForm onSubmit={handleSubmit} loading={loading} initialData={eventData} />
    </div>
  );
}
