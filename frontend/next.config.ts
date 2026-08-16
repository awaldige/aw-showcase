import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dkpy0ps8t/image/upload/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],

    // Permite que o next/image carregue imagens
    // do backend local durante o desenvolvimento.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;