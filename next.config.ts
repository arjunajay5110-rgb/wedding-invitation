import type { NextConfig } from "next";
import os from "os";

const getLocalIPs = (): string[] => {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];
  for (const name of Object.keys(interfaces)) {
    const networkInterface = interfaces[name];
    if (networkInterface) {
      for (const iface of networkInterface) {
        if (iface.family === "IPv4" && !iface.internal) {
          ips.push(iface.address);
          ips.push(`${iface.address}:3000`);
        }
      }
    }
  }
  return ips;
};

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [...getLocalIPs(), "localhost:3000", "localhost"],
} as any; // Cast as any to bypass strict version-specific type limitations if any

export default nextConfig;
