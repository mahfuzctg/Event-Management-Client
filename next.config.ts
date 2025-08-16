/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Use only remotePatterns; domains is deprecated
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
