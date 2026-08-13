import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Cloudflare/Sites build keeps its existing Worker output. The separate
  // `npm run build:node` entry sets this flag and produces a self-hostable
  // Node.js bundle for PM2/Docker/VPS deployments.
  ...(process.env.ZHIZHI_DEPLOY_TARGET === "node"
    ? { output: "standalone" as const }
    : {}),
};

export default nextConfig;
