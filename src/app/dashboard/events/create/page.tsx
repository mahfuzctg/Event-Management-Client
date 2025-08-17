"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

export interface EventFormData {
  title: string;
  description: string;
  location?: string;
  date: string;      // Required
  endDate?: string;  // Optional
  image?: string;
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  loading?: boolean;
  initialData?: Partial<EventFormData>;
}

export default function EventForm({ onSubmit, loading, initialData }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    location: "",
    date: "",
    endDate: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        location: initialData.location || "",
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0,16) : "",
        endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().slice(0,16) : "",
        image: initialData.image || "",
      });
      console.log("Loaded initialData into form:", initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("Form change:", e.target.name, e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("Submitting form with data:", formData);

    const title = formData.title.trim();
    const description = formData.description.trim();
    const date = formData.date.trim();

    if (!title || !description || !date) {
      toast.error("Please fill in all required fields!");
      console.warn("Form validation failed: required fields missing");
      return;
    }

    const payload: EventFormData = {
      title,
      description,
      date: new Date(date).toISOString(),
    };

    if (formData.endDate?.trim()) {
      payload.endDate = new Date(formData.endDate).toISOString();
    }

    if (formData.location?.trim()) {
      payload.location = formData.location.trim();
    }

    if (formData.image?.trim()) {
      payload.image = formData.image.trim();
    }

    console.log("Final payload sent to onSubmit:", payload);
    try {
      onSubmit(payload);
    } catch (err) {
      console.error("Error in onSubmit:", err);
      toast.error("Submission failed! Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-card p-6 rounded-2xl shadow-md max-w-4xl mx-auto"
    >
      <div className="flex flex-col">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Write title..."
          value={formData.title}
          onChange={handleChange}
          className="mt-1"
          required
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Write description..."
          value={formData.description}
          onChange={handleChange}
          className="mt-1 resize-none"
          rows={4}
          required
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="Write location..."
          value={formData.location}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Label htmlFor="date">Start Date & Time</Label>
          <Input
            id="date"
            name="date"
            type="datetime-local"
            placeholder="Select start date & time"
            value={formData.date}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="endDate">End Date & Time</Label>
          <Input
            id="endDate"
            name="endDate"
            type="datetime-local"
            placeholder="Select end date & time"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="image">Banner Image URL</Label>
        <Input
          id="image"
          name="image"
          placeholder="Paste banner image URL..."
          value={formData.image}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      <Button type="submit" className="w-full md:w-auto" disabled={loading}>
        {loading ? "Saving..." : "Submit Event"}
      </Button>
    </form>
  );
}
