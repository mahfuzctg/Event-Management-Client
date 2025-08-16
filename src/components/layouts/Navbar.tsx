"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 shadow-sm backdrop-blur-md bg-white/70 dark:bg-black/30 sticky top-0 z-50">
      <Link href="/" className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        Assignment Portal
      </Link>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full"
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </Button>
    </nav>
  )
}
