"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogEntry } from "@/lib/data-service";

interface BlogListProps {
  blogs: BlogEntry[];
}

export default function BlogList({ blogs }: BlogListProps) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];
  const filteredBlogs = filter === "All" ? blogs : blogs.filter(b => b.category === filter);

  return (
    <div className="container">
      {/* Category Filter */}
      <div className="blog-filters" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        marginBottom: '60px',
        flexWrap: 'wrap'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="blogs-grid">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, idx) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id} className={`blog-card reveal active tilt-card reveal-delay-${(idx % 3) + 1}`}>
              <div className="blog-card-image">
                <img src={blog.image} alt={blog.title} />
                <div className="blog-card-category">{blog.category}</div>
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">{blog.date} • {blog.author}</div>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <span className="blog-card-link">
                  Read Article 
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', width: '100%', gridColumn: 'span 3' }}>
            <h3 style={{ color: 'var(--text-dim)' }}>No articles found in this category.</h3>
          </div>
        )}
      </div>

      <style jsx>{`
        .blog-filters {
          margin-top: -20px;
        }
        .filter-btn {
          padding: 10px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .filter-btn.active {
          background: var(--gradient-primary);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
        }
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 30px;
        }
        .blog-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          overflow: hidden;
          transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: inherit;
        }
        .blog-card:hover {
          transform: translateY(-10px);
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .blog-card-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.6s ease;
        }
        .blog-card:hover .blog-card-image img {
          transform: scale(1.1);
        }
        .blog-card-category {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 6px 16px;
          background: rgba(139, 92, 246, 0.85);
          backdrop-filter: blur(8px);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
        }
        .blog-card-content {
          padding: 30px;
        }
        .blog-card-meta {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 12px;
          font-weight: 500;
        }
        .blog-card-title {
          font-size: 1.6rem;
          line-height: 1.3;
          margin-bottom: 15px;
          font-weight: 700;
          transition: 0.3s;
        }
        .blog-card:hover .blog-card-title {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .blog-card-excerpt {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.6;
          margin-bottom: 25px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          color: #3b82f6;
          transition: 0.3s;
        }
        .blog-card-link svg {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }
        .blog-card:hover .blog-card-link {
          color: #fff;
        }
        .blog-card:hover .blog-card-link svg {
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
}
