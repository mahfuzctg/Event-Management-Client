import type { Metadata } from "next"

import { cn } from "@/lib/utils"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"

export const metadata: Metadata = {
  title: "Assignment Portal",
  description: "Minimalist professional assignment portal",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-foreground antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
