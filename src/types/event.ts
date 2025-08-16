

export type EventStatus = "Ongoing" | "Upcoming" | "Past";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  status: EventStatus;
  date: string;      // ISO string
  startDate: string; // ISO string
  endDate: string;   // ISO string
  location: string;
  image?: string;
 
}
