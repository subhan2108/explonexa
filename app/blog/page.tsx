import { getContent } from "@/lib/data-service";
import BlogPageClient from "@/components/BlogPageClient";

export default async function BlogPage() {
  const data = await getContent();
  const blogs = data.blogs;

  return <BlogPageClient blogs={blogs} />;
}
