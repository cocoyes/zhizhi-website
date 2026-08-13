import { build } from "vite";
import { fileURLToPath } from "node:url";

process.env.ZHIZHI_DEPLOY_TARGET = "node";

await build({
  configFile: fileURLToPath(new URL("../vite.node.config.ts", import.meta.url)),
  mode: "production",
});
