/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { allowedImageWidths } from "../config/image-widths";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (
      (request.method === "GET" || request.method === "HEAD")
      && url.hostname === "zhizhi.deepyou.top"
      && (url.pathname === "/" || /^\/(download|support|privacy|terms|guides(?:\/[^/]+)?)\/?$/.test(url.pathname))
    ) {
      url.hostname = "deepyou.top";
      url.protocol = "https:";
      return Response.redirect(url, 308);
    }

    if (url.pathname === "/_vinext/image") {
      const images = env.IMAGES;
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: images ? async (body, { width, format, quality }) => {
          const result = await images.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        } : undefined,
      }, allowedImageWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
