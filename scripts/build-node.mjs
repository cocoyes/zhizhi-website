import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const vinextCli = fileURLToPath(
  new URL("../node_modules/vinext/dist/cli.js", import.meta.url),
);

// App Router builds need Vinext's multi-environment build orchestration. Calling
// Vite's single-environment build() directly leaves the RSC bundle unavailable
// when the client assets manifest is generated.
const child = spawn(process.execPath, [vinextCli, "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    ZHIZHI_DEPLOY_TARGET: "node",
  },
});

const exitCode = await new Promise((resolve, reject) => {
  child.once("error", reject);
  child.once("exit", (code, signal) => {
    if (signal) {
      reject(new Error(`Vinext build terminated by signal ${signal}`));
      return;
    }
    resolve(code ?? 1);
  });
});

if (exitCode !== 0) {
  process.exitCode = exitCode;
}
