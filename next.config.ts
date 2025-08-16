import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  images: {
    domains: ["res.cloudinary.com", "example.com"], 
  },
};

export default nextConfig;
