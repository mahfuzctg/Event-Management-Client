"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEventActions } from "@/features/events/hooks";
import EventForm from "@/components/events/EventForm";
import { getToken } from "@/features/auth/utils";

export default function CreateEventPage() {
  const router = useRouter();
  const token = getToken() || "";
  const { addEvent } = useEventActions(token);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await addEvent(data);
      router.push("/dashboard/events");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <EventForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
