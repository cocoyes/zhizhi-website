import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("omits development preview metadata from the production build", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.doesNotMatch(await response.text(), developmentPreviewMeta);
});

test("keeps the development web manifest on the current origin", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-manifest`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/download", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.deepEqual(
    html.match(/<link rel="manifest"[^>]*>/g),
    ['<link rel="manifest" href="/manifest.webmanifest"/>'],
  );
});

test("serves fixed-size site images at their rendered widths", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-images`);
  const { default: worker } = await import(workerUrl.href);
  const png = new Uint8Array([137, 80, 78, 71]);
  const env = {
    ASSETS: {
      fetch: async () => new Response(png, {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
    },
    IMAGES: {
      input: () => ({
        transform: () => ({
          output: async () => ({
            response: () => new Response(png, {
              status: 200,
              headers: { "content-type": "image/png" },
            }),
          }),
        }),
      }),
    },
  };
  const ctx = {
    waitUntil() {},
    passThroughOnException() {},
  };

  for (const [path, width] of [
    ["/images/zhizhi-icon.png", 42],
    ["/images/zhizhi-logo.png", 212],
    ["/images/journal-reading.webp", 720],
  ]) {
    const url = new URL("http://localhost/_vinext/image");
    url.searchParams.set("url", path);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", "75");
    const response = await worker.fetch(new Request(url), env, ctx);
    assert.equal(response.status, 200, `${path} at ${width}px should be accepted`);
  }
});
