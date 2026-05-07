"use client";

import { BlogEntry } from "@/lib/data-service";
import BlogList from "@/components/BlogList";

interface BlogPageClientProps {
  blogs: BlogEntry[];
}

export default function BlogPageClient({ blogs }: BlogPageClientProps) {
  return (
    <div className="blog-page">
      <section className="inner-hero section-padding">
        <div className="container">
          <div className="hero-content reveal">
            <div className="section-badge">Insights & Intelligence</div>
            <h1 className="hero-title">The <span className="gradient-text">Explonexa</span> Journal</h1>
            <p className="hero-subtitle">Deep dives into marketing, technology, and the future of digital growth.</p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: '0' }}>
        <div className="container">
          <BlogList blogs={blogs} />
        </div>
      </section>

      <style jsx>{`
        .inner-hero {
          padding-top: 180px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
