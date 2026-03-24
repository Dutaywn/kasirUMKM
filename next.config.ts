import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['http://localhost:3000', 'http://[IP_ADDRESS]'],
};

export default nextConfig;
