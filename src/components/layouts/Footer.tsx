"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card text-foreground border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-lg font-semibold">Event Management System</h2>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>

        <div className="flex space-x-4 justify-center md:justify-end text-foreground">
          <Link href="https://facebook.com" target="_blank" className="transition-colors hover:text-primary">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="transition-colors hover:text-primary">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="transition-colors hover:text-primary">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="transition-colors hover:text-primary">
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
