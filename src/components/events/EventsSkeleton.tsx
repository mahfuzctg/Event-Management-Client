import { Card, CardContent } from "@/components/ui/card";

export default function EventsSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {["Ongoing Events", "Upcoming Events", "Past Events"].map((title) => (
        <div key={title} className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-400">{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="rounded-2xl shadow-sm">
                <div className="h-40 w-full bg-gray-300 rounded-t-2xl" />
                <CardContent className="space-y-3 p-4">
                  <div className="h-6 w-3/4 bg-gray-300 rounded-md" />
                  <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
                  <div className="h-4 w-2/3 bg-gray-300 rounded-md" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
