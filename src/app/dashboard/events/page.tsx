
"use client";

import React from "react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  React.useEffect(() => {
    toast.success("Welcome to the dashboard!");
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Events</h1>
      <p>Manage your events and view analytics here.</p>
    </div>
  );
}
