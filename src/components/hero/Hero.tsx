// src/components/hero/Hero.tsx
"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 md:px-16
        bg-background dark:bg-background overflow-hidden">
      
      {/* Text Content */}
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text
            bg-gradient-to-r from-primary to-secondary">
          Discover Amazing Events
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground">
          Explore Upcoming, Ongoing, and Past events. Stay updated with your local timezone and never miss an important event.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button className="bg-primary text-primary-foreground hover:bg-secondary transition-all shadow-lg">
            Browse Events
          </Button>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 shadow-sm"
          >
            Admin Login
          </Button>
        </div>
      </div>

      {/* Subtle Background Circles */}
      <div className="absolute -z-10 w-72 h-72 bg-accent/20 dark:bg-accent/40 rounded-full top-[-10%] left-[-10%] blur-3xl"></div>
      <div className="absolute -z-10 w-96 h-96 bg-secondary/10 dark:bg-secondary/30 rounded-full bottom-[-20%] right-[-20%] blur-3xl"></div>
    </section>
  )
}
