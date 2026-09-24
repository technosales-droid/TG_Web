import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Mission, Why and Approach pages are folded into /about.
  async redirects() {
    return ["mission", "why-technogurukul", "approach"].map((slug) => ({
      source: `/about/${slug}`,
      destination: "/about",
      permanent: true,
    }));
  },
};

export default nextConfig;
