import { projects } from "@/data/projects";
import type { Project } from "@/lib/types";

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(count = 2): Project[] {
  return projects.filter((p) => p.featured).slice(0, count);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectTags(): string[] {
  const tags = new Set<string>();
  for (const project of projects) {
    for (const tag of project.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}
