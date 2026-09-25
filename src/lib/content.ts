/**
 * Content access layer.
 *
 * Pages never import data files directly; they call these functions.
 * They're async so they can be re-pointed at a headless CMS or API
 * without touching any page or component.
 */
import { projects } from "@/content/projects";
import { products } from "@/content/products";
import { services, engagementModels, process } from "@/content/services";
import { team } from "@/content/team";
import type { ServiceKey } from "@/content/types";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getProjects() {
  return [...projects].sort(byOrder);
}

export async function getFeaturedProjects() {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

/** The project that follows `slug`, wrapping around. */
export async function getNextProject(slug: string) {
  const all = await getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return all[(i + 1) % all.length];
}

export async function getProducts() {
  return [...products].sort(byOrder);
}

export async function getProduct(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getServices() {
  return services;
}

export function serviceTitle(key: ServiceKey) {
  return services.find((s) => s.key === key)?.title ?? key;
}

export async function getEngagementModels() {
  return engagementModels;
}

export async function getProcess() {
  return process;
}

export async function getTeam() {
  return team;
}
