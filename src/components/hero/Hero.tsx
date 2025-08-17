"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 md:px-16
        bg-gradient-to-b from-background to-background/90 overflow-hidden"
    >
      {/* Text Content */}
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold  ">
          Discover Amazing Events
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground">
          Explore Upcoming, Ongoing, and Past events. Stay updated with your local timezone and never miss an important event.
        </p>

        <div className="mt-6 flex justify-center">
          <Link href="/events" passHref>
            <Button className="bg-primary text-primary-foreground hover:bg-secondary hover:scale-105 transition-transform shadow-lg px-8 py-4 text-lg font-medium">
              Browse Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Background Circles */}
      <div className="absolute -z-10 w-72 h-72 bg-accent/20 dark:bg-accent/40 rounded-full top-[-10%] left-[-10%] blur-3xl animate-pulse-slow"></div>
      <div className="absolute -z-10 w-96 h-96 bg-secondary/10 dark:bg-secondary/30 rounded-full bottom-[-20%] right-[-20%] blur-3xl animate-pulse-slow"></div>
    </section>
  );
}
