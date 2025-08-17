import { API_BASE } from "@/lib/api-client";
import { IEvent } from "@/types/event";

// -------------------- READ --------------------

// Get all events
export const getAllEvents = async (): Promise<IEvent[]> => {
  const res = await fetch(`${API_BASE}/events`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  // Backend returns { success: true, events: [...] }
  return data?.events || [];
};

// Get single event by ID
export const getEventById = async (id: string): Promise<IEvent> => {
  const res = await fetch(`${API_BASE}/events/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch event");
  const data = await res.json();
  return data?.event; // backend returns { success: true, event: {...} }
};

// -------------------- CREATE --------------------
export const createEvent = async (
  payload: Partial<IEvent>,
  token: string
): Promise<IEvent> => {
  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to create event");
  }

  const data = await res.json();
  return data?.event; // backend returns { success: true, event: {...} }
};

// -------------------- UPDATE --------------------
export const updateEvent = async (
  id: string,
  payload: Partial<IEvent>,
  token: string
): Promise<IEvent> => {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to update event");
  }

  const data = await res.json();
  return data?.event; // backend returns { success: true, event: {...} }
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

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to delete event");
  }

  const data = await res.json();
  return data; // backend returns { success: true, event: {...} } (for DELETE you can ignore event)
};
