"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, CalendarDays } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flex justify-between items-center w-full px-6 py-4 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      {/* Brand / Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"
      >
        <CalendarDays className="w-6 h-6 text-rose-500" />
        Event Manager
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          href="/events"
          className="text-sm font-medium hover:text-rose-500 transition-colors"
        >
          Events
        </Link>
        <Link
          href="/auth/login"
          className="text-sm font-medium hover:text-rose-500 transition-colors"
        >
          Admin Login
        </Link>

        {/* Dark / Light Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full border-muted-foreground/30 hover:bg-rose-500/10"
        >
          {theme === "light" ? (
            <Moon size={18} className="text-rose-500" />
          ) : (
            <Sun size={18} className="text-rose-400" />
          )}
        </Button>
      </div>
    </nav>
  )
}
