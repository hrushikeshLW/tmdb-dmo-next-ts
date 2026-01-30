import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  images: {
    domains: ["encrypted-tbn0.gstatic.com", "image.tmdb.org"],
  },
};

export default nextConfig;
