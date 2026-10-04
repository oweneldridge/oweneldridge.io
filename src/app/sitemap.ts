import type { MetadataRoute } from "next";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-static";

const SITE = "https://oweneldridge.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about/",
    "/resume/",
    ...listProjects().map((p) => `/projects/${p.slug}/`),
  ];
  return paths.map((path) => ({ url: `${SITE}${path}` }));
}
