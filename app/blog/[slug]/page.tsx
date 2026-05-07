import { getContent } from "@/lib/data-service";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/BlogPostClient";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getContent();
  const blog = data.blogs.find(b => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  // Get related blogs (excluding current one)
  const relatedBlogs = data.blogs
    .filter(b => b.id !== blog.id)
    .slice(0, 3);

  return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} />;
}
