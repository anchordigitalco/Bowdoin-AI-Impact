// Shared content types for the site's static data layer.
// See CONTENT.md for exactly which files to edit to add or change content.

export interface CurriculumUnit {
  /** Session number within the semester, 1-indexed. */
  order: number;
  title: string;
  /** One-line description shown on the session card. */
  description: string;
}

export type ProjectStatus = "in-progress" | "completed";

export interface ProjectPerson {
  name: string;
  role?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  /** Longer body copy for the project detail page. Plain paragraphs. */
  body?: string[];
  people: ProjectPerson[];
  stack: string[];
  status: ProjectStatus;
  tags: string[];
  links?: ProjectLink[];
  featured?: boolean;
  image?: string;
}

export type MemberGroup = "president" | "team";

export interface TeamMember {
  slug: string;
  name: string;
  /** Optional — a member's bio (and the class year/major that go with it)
   *  may not be written yet. */
  classYear?: string;
  major?: string;
  role: string;
  group: MemberGroup;
  bio?: string;
  linkedin?: string;
  photo?: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  authorRole?: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
}
