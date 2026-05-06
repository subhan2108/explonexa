import { getContent } from "@/lib/data-service";
import BlogList from "@/components/BlogList";

export default async function BlogPage() {
  const data = await getContent();
  const blogs = data.blogs;

  return (
    <main className="blog-page">
      <div className="noise-overlay"></div>
      <div className="aurora-bg">
        <div className="aurora-blob"></div><div className="aurora-blob"></div><div className="aurora-blob"></div>
      </div>
      <div className="grid-overlay"></div>

      <nav className="navbar scrolled">
        <div className="container">
          <a href="/" className="logo">Explonexa</a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/blog" className="active">Blog</a>
            <a href="/#contact" className="nav-cta">Get Started</a>
          </div>
        </div>
      </nav>

      <section className="blog-hero section-padding" style={{ paddingTop: '180px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="section-header reveal active" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div className="section-badge">Insights & Intelligence</div>
            <h1 className="section-title" style={{ fontSize: '4rem', marginBottom: '20px' }}>The <span className="gradient-text">Explonexa</span> Journal</h1>
            <p className="section-subtitle" style={{ fontSize: '1.2rem' }}>Deep dives into marketing, technology, and the future of digital growth.</p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: '0' }}>
        <BlogList blogs={blogs} />
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '80px' }}>
            <div className="footer-brand">
              <a href="/" className="logo" style={{ marginBottom: '25px', display: 'inline-block' }}>Explonexa</a>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.8' }}>Explosive Growth To The Next Level. We combine data science with creative excellence to build brands that dominate.</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', marginBottom: '25px' }}>Links</h4>
              <ul style={{ listStyle: 'none', padding: '0', display: 'grid', gap: '12px' }}>
                <li><a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/blog" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Journal</a></li>
                <li><a href="/#contact" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#fff', marginBottom: '25px' }}>Social</h4>
              <ul style={{ listStyle: 'none', padding: '0', display: 'grid', gap: '12px' }}>
                <li><a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Twitter</a></li>
                <li><a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>LinkedIn</a></li>
                <li><a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
            <p>&copy; 2026 Explonexa Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
