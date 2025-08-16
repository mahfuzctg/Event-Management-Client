
"use client";

import React from "react";
import { CalendarOff } from "lucide-react";

interface NoDataProps {
  message?: string;
}

const NoData: React.FC<NoDataProps> = ({ message = "No events available at the moment." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground space-y-4">
      <CalendarOff className="w-16 h-16 text-gray-400" />
      <h2 className="text-2xl font-semibold">Nothing Here</h2>
      <p className="text-sm max-w-xs">{message}</p>
    </div>
  );
};

export default NoData;
