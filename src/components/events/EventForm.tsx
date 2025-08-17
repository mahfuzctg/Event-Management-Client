"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  loading?: boolean;
  initialData?: Partial<EventFormData>;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  image?: string;
}

export default function EventForm({ onSubmit, loading = false, initialData }: EventFormProps) {
  const [form, setForm] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    image: "",
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Start Date & Time</label>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">End Date & Time</label>
        <input
          type="datetime-local"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Image URL</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Event"}
      </Button>
    </form>
  );
}
