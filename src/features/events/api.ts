import { API_BASE } from "@/lib/api-client";
import { IEvent } from "@/types/event";

// Helper: Ensure ISO string format
const normalizeDates = (payload: Partial<IEvent>) => {
  const copy = { ...payload };

  if (copy.date) {
    copy.date = new Date(copy.date).toISOString(); // ensures "2025-08-02T13:33:00.000Z"
  }
  if (copy.endDate) {
    copy.endDate = new Date(copy.endDate).toISOString();
  }

  return copy;
};

// -------------------- READ --------------------

// Get all events
export const getAllEvents = async (): Promise<IEvent[]> => {
  const res = await fetch(`${API_BASE}/events`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data?.events || [];
};

// Get single event by ID
export const getEventById = async (id: string): Promise<IEvent> => {
  const res = await fetch(`${API_BASE}/events/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch event");
  const data = await res.json();
  return data?.event;
};

// -------------------- CREATE --------------------
export const createEvent = async (
  payload: Partial<IEvent>,
  token: string
): Promise<IEvent> => {
  const body = normalizeDates(payload);

  console.log("📤 Sending createEvent payload:", body);

  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("❌ Create Event Error Response:", data);
    throw new Error(
      data.message ||
        Object.values(data.errors || {}).map((e: any) => e.message).join(", ") ||
        "Failed to create event"
    );
  }

  return data?.event;
};

// -------------------- UPDATE --------------------
export const updateEvent = async (
  id: string,
  payload: Partial<IEvent>,
  token: string
): Promise<IEvent> => {
  const body = normalizeDates(payload);

  console.log("📤 Sending updateEvent payload:", body);

  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("❌ Update Event Error Response:", data);
    throw new Error(
      data.message ||
        Object.values(data.errors || {}).map((e: any) => e.message).join(", ") ||
        "Failed to update event"
    );
  }

  return data?.event;
};

// -------------------- DELETE --------------------
export const deleteEvent = async (
  id: string,
  token: string
): Promise<{ success: boolean }> => {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("❌ Delete Event Error Response:", data);
    throw new Error(
      data.message ||
        Object.values(data.errors || {}).map((e: any) => e.message).join(", ") ||
        "Failed to delete event"
    );
  }

  return data;
};
