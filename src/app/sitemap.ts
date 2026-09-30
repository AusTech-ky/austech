import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getCaseStudies } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getCaseStudies();
  const now = new Date();
  const pages = ["", "/services", "/work", "/products", "/about", "/contact", "/cookies", "/privacy"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const caseStudies = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...pages, ...caseStudies];
}
