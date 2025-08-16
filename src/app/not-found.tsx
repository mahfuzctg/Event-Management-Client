"use client";

import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-lg space-y-6">
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground hover:text-primary transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
