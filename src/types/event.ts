export type EventStatus = "upcoming" | "ongoing" | "past";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  location: string;
  image?: string;
}
