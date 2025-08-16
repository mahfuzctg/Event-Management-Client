// src/types/event.ts

export type EventStatus = "ongoing" | "upcoming" | "past";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  status?: EventStatus; // optional because we calculate dynamically
  startDate: string;    // ISO string for start datetime
  endDate: string;      // ISO string for end datetime
  location: string;
  image?: string;
}
