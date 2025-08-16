import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import dynamic from "next/dynamic";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { AuthProvider } from "@/providers/AuthContext";




export const metadata = {
  title: "Event Management System",
  description: "Browse and manage events easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground transition-colors duration-300 flex flex-col min-h-screen">
        <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
