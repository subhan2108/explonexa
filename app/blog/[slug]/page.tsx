import { getContent } from "@/lib/data-service";
import { notFound } from "next/navigation";
import Link from "next/link";

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

  return (
    <main className="blog-post-page">
      <div className="noise-overlay"></div>
      <div className="aurora-bg">
        <div className="aurora-blob"></div><div className="aurora-blob"></div><div className="aurora-blob"></div>
      </div>
      <div className="grid-overlay"></div>

      <nav className="navbar scrolled">
        <div className="container">
          <Link href="/" className="logo">Explonexa</Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#contact" className="nav-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Reading Progress Bar (Visual Only) */}
      <div style={{ position: 'fixed', top: '70px', left: 0, width: '30%', height: '3px', background: 'var(--gradient-primary)', zIndex: 1000 }}></div>

      <article className="section-padding" style={{ paddingTop: '180px' }}>
        <div className="container">
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            
            <header className="post-header" style={{ marginBottom: '60px' }}>
              <Link href="/blog" className="back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
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
                <div className="social-share-minimal">
                  <span>Share:</span>
                  <div className="share-icons">
                    {['twitter', 'linkedin', 'link'].map(icon => (
                      <button key={icon} className="share-btn-mini" aria-label={`Share on ${icon}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                          {icon === 'twitter' && <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />}
                          {icon === 'linkedin' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>}
                          {icon === 'link' && <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />}
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            <div className="post-featured-image">
              <img src={blog.image} alt={blog.title} />
              <div className="image-overlay-glow"></div>
            </div>

            <div className="post-content-container">
              {/* Floating Share (Side) */}
              <aside className="post-sidebar">
                <div className="sticky-share">
                   <div className="share-label">SHARE</div>
                   <div className="share-vertical">
                      <button className="v-share-btn">Tw</button>
                      <button className="v-share-btn">Li</button>
                      <button className="v-share-btn">Fb</button>
                   </div>
                </div>
              </aside>

              <div className="post-body" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>

            {/* Author Bio Card */}
            <div className="author-bio-card">
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
          <h2 className="related-title">More from the <span className="gradient-text">Journal</span></h2>
          <div className="related-grid">
            {relatedBlogs.map(item => (
              <Link href={`/blog/${item.slug}`} key={item.id} className="related-card">
                <div className="related-img"><img src={item.image} alt={item.title} /></div>
                <h3>{item.title}</h3>
                <div className="related-meta">{item.category} • {item.date}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; 2026 Explonexa Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
