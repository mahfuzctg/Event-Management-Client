// src/components/hero/Hero.tsx
"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 bg-gradient-to-r from-rose-50 via-rose-100 to-pink-50 dark:from-rose-900 dark:via-rose-950 dark:to-pink-900 overflow-hidden">
      
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-6 md:max-w-lg"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
          Discover Amazing Events
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse Upcoming, Ongoing, and Past events easily. Stay updated with your local timezone and never miss an event.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button className="bg-rose-500 hover:bg-rose-600 text-white transition-all">
            Browse Events
          </Button>
          <Button variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-800">
            Admin Login
          </Button>
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-1 mt-10 md:mt-0 relative w-full max-w-lg"
      >
        <Image
          src="/hero-event.png" // Replace with your relevant image
          alt="Event Illustration"
          width={500}
          height={500}
          className="rounded-xl shadow-xl animate-fadeIn"
        />
      </motion.div>

      {/* Background shapes */}
      <div className="absolute -z-10 w-72 h-72 bg-rose-200/30 dark:bg-rose-800/30 rounded-full top-[-10%] left-[-10%] blur-3xl animate-animate-float"></div>
      <div className="absolute -z-10 w-96 h-96 bg-pink-300/20 dark:bg-pink-700/20 rounded-full bottom-[-20%] right-[-20%] blur-3xl animate-animate-float"></div>
    </section>
  )
}
