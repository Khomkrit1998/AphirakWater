import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/shared"],
  // Dev only: let a phone on the home Wi-Fi open `pnpm dev` by LAN IP. Without it
  // Next blocks the dev JS for that origin (403), the page never hydrates and
  // client components such as the mobile menu do nothing.
  allowedDevOrigins: ["192.168.*.*"],
}

export default nextConfig
