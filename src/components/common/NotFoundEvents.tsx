"use client";

interface NotFoundEventsProps {
  message: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  colorClass?: string;
}

export default function NotFoundEvents({
  message,
  Icon,
  colorClass = "text-muted-foreground",
}: NotFoundEventsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-2 bg-background/50 border border-border/50 rounded-lg">
      <Icon className={`w-16 h-16 ${colorClass} animate-pulse`} />
      <p className="text-muted-foreground text-center">{message}</p>
    </div>
  );
}
