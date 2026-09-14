import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card, CardDescription, CardEyebrow, CardFooter, CardTitle } from "@/components/ui/Card";
import { getFeaturedPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { formatDate } from "@/lib/utils";

export function PreviewStrip() {
  const posts = getFeaturedPosts(2);
  const projects = getFeaturedProjects(2);

  return (
    <Section as="section" id="latest">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold sm:text-3xl">From the blog</h2>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              All posts <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="block h-full">
                <Card>
                  <CardEyebrow>
                    {formatDate(post.date)} · {post.author}
                  </CardEyebrow>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold sm:text-3xl">Featured projects</h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              All projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="block h-full">
                <Card>
                  <CardEyebrow>{project.stack.slice(0, 2).join(" · ")}</CardEyebrow>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                  <CardFooter>
                    <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {project.status === "in-progress" ? "In progress" : "Completed"}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
