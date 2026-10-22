import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vinextStaticCachePaths = [
  path.join(
    projectRoot,
    "node_modules",
    "vinext",
    "dist",
    "server",
    "static-file-cache.js",
  ),
  path.join(
    projectRoot,
    "dist",
    "standalone",
    "node_modules",
    "vinext",
    "dist",
    "server",
    "static-file-cache.js",
  ),
];

const windowsOnlyImplementation =
  "relativePath: path.relative(base, batch[j]),";
const crossPlatformImplementation =
  'relativePath: path.relative(base, batch[j]).split(path.sep).join("/"),';

export async function patchVinextStaticCacheFiles() {
  for (const filePath of vinextStaticCachePaths) {
    let source;

    try {
      source = await readFile(filePath, "utf8");
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      throw error;
    }

    if (source.includes(crossPlatformImplementation)) continue;

    if (!source.includes(windowsOnlyImplementation)) {
      throw new Error(
        `Unable to patch ${filePath}: the expected Vinext implementation was not found`,
      );
    }

    await writeFile(
      filePath,
      source.replace(windowsOnlyImplementation, crossPlatformImplementation),
      "utf8",
    );
    console.log(
      `[zhizhi] Patched Vinext static asset paths in ${path.relative(projectRoot, filePath)}`,
    );
  }
}

const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (invokedDirectly) {
  await patchVinextStaticCacheFiles();
}
