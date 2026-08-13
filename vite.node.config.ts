import vinext from "vinext";
import { defineConfig } from "vite";

// Node/VPS builds deliberately omit the Cloudflare and Sites plugins. Vinext
// reads `output: "standalone"` from next.config.ts and emits a Node server.
export default defineConfig({
  plugins: [vinext()],
});
