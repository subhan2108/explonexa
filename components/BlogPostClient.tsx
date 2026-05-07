"use client";

import { BlogData } from "@/lib/data-service";
import Link from "next/link";

interface BlogPostClientProps {
  blog: BlogData;
  relatedBlogs: BlogData[];
}

export default function BlogPostClient({ blog, relatedBlogs }: BlogPostClientProps) {
  return (
    <div className="blog-post-page">
      <article className="section-padding" style={{ paddingTop: '180px' }}>
        <div className="container">
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            
            <header className="post-header" style={{ marginBottom: '60px' }}>
              <Link href="/blog" className="back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px', marginRight: '8px' }}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Journal
              </Link>
              
              <h1 className="post-title" style={{ marginTop: '30px' }}>{blog.title}</h1>
              
              <div className="post-meta-detailed">
                <div className="author-info">
                  <div className="author-avatar">{blog.author[0]}</div>
                  <div>
                    <div className="author-name">{blog.author}</div>
                    <div className="post-date">{blog.date} • 8 min read</div>
                  </div>
                </div>
              </div>
            </header>

            <div className="post-featured-image">
              <img src={blog.image} alt={blog.title} />
              <div className="image-overlay-glow"></div>
            </div>

            <div className="post-content-container">
              <div className="post-body" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>

            {/* Author Bio Card */}
            <div className="author-bio-card reveal">
              <div className="bio-avatar">{blog.author[0]}</div>
              <div className="bio-content">
                <h4>About {blog.author}</h4>
                <p>Digital strategist and lead content editor at Explonexa. Specialized in data-driven marketing and global scaling strategies.</p>
                <div className="bio-social">
                   <a href="#">Follow on Twitter</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="section-padding related-section">
        <div className="container">
          <h2 className="related-title reveal">More from the <span className="gradient-text">Journal</span></h2>
          <div className="related-grid">
            {relatedBlogs.map((item, idx) => (
              <Link href={`/blog/${item.slug}`} key={item.id} className={`related-card reveal reveal-delay-${idx+1}`}>
                <div className="related-img"><img src={item.image} alt={item.title} /></div>
                <div className="related-content">
                   <h3>{item.title}</h3>
                   <div className="related-meta">{item.category} • {item.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: 0.3s ease;
        }
        .back-link:hover {
          color: var(--accent-purple);
          transform: translateX(-5px);
        }
        .post-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
          margin-bottom: 30px;
        }
        .post-meta-detailed {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 30px;
          border-bottom: 1px solid var(--border-color);
        }
        .author-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .author-avatar {
          width: 50px;
          height: 50px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.2rem;
        }
        .author-name {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .post-date {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .post-featured-image {
          width: 100%;
          height: 500px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin: 60px 0;
          position: relative;
        }
        .post-featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-overlay-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent, rgba(0,0,0,0.4));
        }
        .post-body {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }
        .post-body :global(h2) {
          color: var(--text-primary);
          font-size: 2rem;
          margin: 60px 0 30px;
        }
        .post-body :global(p) {
          margin-bottom: 30px;
        }
        .author-bio-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 40px;
          border-radius: var(--radius-lg);
          display: flex;
          gap: 30px;
          margin-top: 100px;
          backdrop-filter: blur(10px);
        }
        .bio-avatar {
          width: 80px;
          height: 80px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          flex-shrink: 0;
        }
        .bio-content h4 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }
        .bio-content p {
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .bio-social a {
          color: var(--accent-blue);
          font-weight: 600;
          text-decoration: none;
        }
        .related-title {
          font-size: 2.5rem;
          margin-bottom: 50px;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .related-card {
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: 0.3s ease;
          border: 1px solid var(--border-color);
        }
        .related-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-purple);
        }
        .related-img {
          height: 200px;
          overflow: hidden;
        }
        .related-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s ease;
        }
        .related-card:hover .related-img img {
          transform: scale(1.1);
        }
        .related-content {
          padding: 24px;
        }
        .related-content h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .related-meta {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        @media (max-width: 991px) {
          .related-grid {
            grid-template-columns: 1fr;
          }
          .post-featured-image {
            height: 300px;
          }
          .author-bio-card {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
