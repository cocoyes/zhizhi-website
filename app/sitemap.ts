import type { MetadataRoute } from "next";
import { guides } from "./guides/data";

const siteUrl = "https://deepyou.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/download", "/guides", "/support", "/privacy", "/terms", ...guides.map((guide) => `/guides/${guide.slug}`)];
  return routes.map((route, index) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: new Date("2026-10-22"),
    changeFrequency: index < 4 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : index < 4 ? 0.9 : 0.75,
  }));
}
