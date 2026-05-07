"use client";

import { useEffect, useRef } from "react";
import { SiteContent } from "@/lib/data-service";

interface HomeClientProps {
  content: SiteContent;
}

export default function HomeClient({ content }: HomeClientProps) {
  const { hero, about, services, whyUs, results, testimonials, cta, contact } = content;
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // REVEAL & COUNTERS
    function animateCounters(elements: Element[] | NodeListOf<Element>) {
      elements.forEach(counter => {
        const targetAttr = counter.getAttribute('data-count') || counter.getAttribute('data-target');
        if (!targetAttr) return;
        const target = parseInt(targetAttr), duration = 2000, start = performance.now();
        const suffix = counter.textContent?.replace('0', '').trim() || '';
        function update(currentTime: number) {
          const elapsed = currentTime - start, progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(entry.target.querySelectorAll('.hero-stat-number')); statsObserver.unobserve(entry.target); } });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

    const metricObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { animateCounters([entry.target]); metricObserver.unobserve(entry.target); } });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.about-metric-value').forEach(el => metricObserver.observe(el));

    // INTERACTIONS
    document.querySelectorAll('.service-card, .why-card, .portfolio-card, .testimonial-card').forEach(card => {
      card.addEventListener('mousemove', (e: any) => {
        const rect = card.getBoundingClientRect();
        (card as HTMLElement).style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        (card as HTMLElement).style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
      });
    });

    // FORM
    const form = document.getElementById('contactForm') as HTMLFormElement;
    const onFormSubmit = (e: Event) => {
      e.preventDefault(); 
      const btn = form?.querySelector('.form-submit') as HTMLButtonElement;
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
      setTimeout(() => {
        document.getElementById('formSuccess')?.classList.add('show'); 
        if (btn) btn.textContent = 'Message Sent ✓'; 
        form?.reset();
        setTimeout(() => { 
          document.getElementById('formSuccess')?.classList.remove('show'); 
          if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; } 
        }, 5000);
      }, 1500);
    };
    form?.addEventListener('submit', onFormSubmit);

    // CANVAS
    const canvas = heroCanvasRef.current;
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    document.addEventListener('mousemove', onMouseMove);

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let particles: any[] = [], animationId: number;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize(); window.addEventListener('resize', resize);
        
        class Particle {
          x=0; y=0; size=0; speedX=0; speedY=0; opacity=0; color='';
          constructor() { this.reset(); }
          reset() {
            this.x = Math.random() * canvas!.width; this.y = Math.random() * canvas!.height;
            this.size = Math.random() * 2 + 0.5; this.speedX = (Math.random() - 0.5) * 0.5; this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1; this.color = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)];
          }
          update() {
            this.x += this.speedX; this.y += this.speedY;
            const dx = mouseX - this.x, dy = mouseY - this.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) { const force = (150 - dist) / 150; this.x -= dx * force * 0.02; this.y -= dy * force * 0.02; }
            if (this.x < 0 || this.x > canvas!.width || this.y < 0 || this.y > canvas!.height) this.reset();
          }
          draw() { ctx!.beginPath(); ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx!.fillStyle = this.color; ctx!.globalAlpha = this.opacity; ctx!.fill(); ctx!.globalAlpha = 1; }
        }

        for (let i = 0; i < Math.min(120, Math.floor(window.innerWidth / 15)); i++) particles.push(new Particle());
        
        const animate = () => {
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height); particles.forEach(p => { p.update(); p.draw(); });
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 120) { 
                ctx!.beginPath(); 
                ctx!.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`; 
                ctx!.lineWidth = 0.5; 
                ctx!.moveTo(particles[i].x, particles[i].y); 
                ctx!.lineTo(particles[j].x, particles[j].y); 
                ctx!.stroke(); 
              }
            }
          }
          animationId = requestAnimationFrame(animate);
        };
        animate(); 
        return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
      }
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      statsObserver.disconnect(); metricObserver.disconnect();
      form?.removeEventListener('submit', onFormSubmit);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg"><canvas ref={heroCanvasRef} id="heroCanvas"></canvas><div className="hero-glow"></div></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge"><span className="dot"></span> {hero.badge}</div>
            <h1 className="hero-title">
              <span className="line"><span>{hero.titleLine1}</span></span>
              <span className="line"><span className="gradient-text">{hero.titleLine2}</span></span>
            </h1>
            <p className="hero-subtitle">{hero.subtitle}</p>
            <div className="hero-buttons">
              <a href="/#contact" className="btn btn-primary btn-magnetic">{hero.primaryBtnText}</a>
              <a href="/#services" className="btn btn-secondary btn-magnetic">{hero.secondaryBtnText}</a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="hero-stat-number" data-count="500">0+</div><div className="hero-stat-label">Clients Served</div></div>
              <div className="hero-stat"><div className="hero-stat-number" data-count="10">0M+</div><div className="hero-stat-label">Revenue Generated</div></div>
              <div className="hero-stat"><div className="hero-stat-number" data-count="98">0%</div><div className="hero-stat-label">Client Retention</div></div>
              <div className="hero-stat"><div className="hero-stat-number" data-count="50">0+</div><div className="hero-stat-label">Team Members</div></div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator"><span>Scroll</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7" /></svg></div>
      </section>

      {/* Marquee Section */}
      <section className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="marquee-group" style={{ display: 'flex' }}>
              {["Digital Marketing", "SEO Optimization", "Social Media", "Google Ads", "Web Development", "Content Marketing", "Video Editing", "Brand Strategy"].map((text, idx) => (
                <div key={idx} className="marquee-item"><span>{text}</span><span className="marquee-dot"></span></div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about section-padding" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content reveal">
              <div className="section-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px', marginRight: '8px'}}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg> {about.badge}</div>
              <h2>{about.title}</h2>
              <p>{about.description1}</p>
              <p>{about.description2}</p>
              <div className="about-features">
                {about.features.map((f, i) => (
                  <div key={i} className="about-feature">
                    <div className="about-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg></div>
                    <div><h4>{f.title}</h4><p>{f.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-visual reveal reveal-delay-2">
              <div className="about-card"><div className="about-card-inner"><h3>Our Impact</h3><div className="about-metrics">
                {about.metrics.map((m, i) => (
                  <div key={i} className="about-metric"><div className="about-metric-value" data-target={m.value}>0{m.label === 'Retention' ? '%' : '+'}</div><div className="about-metric-label">{m.label}</div></div>
                ))}
              </div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding" id="services">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px', marginRight: '8px'}}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg> {services.badge}</div>
            <h2 className="section-title">{services.title}</h2>
            <p className="section-subtitle">{services.subtitle}</p>
          </div>
          <div className="services-grid">
            {services.list.map((s, idx) => (
              <div key={idx} className={`service-card reveal reveal-delay-${idx+1} tilt-card`}>
                <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></div>
                <h3>{s.title}</h3><p>{s.desc}</p>
                <div className="service-features">{s.features.map((f, i) => <div key={i} className="service-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg><span>{f}</span></div>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us section-padding" id="why-us">
        <div className="container">
          <div className="section-header reveal"><div className="section-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px', marginRight: '8px'}}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> {whyUs.badge}</div><h2 className="section-title">{whyUs.title}</h2><p className="section-subtitle">{whyUs.subtitle}</p></div>
          <div className="why-grid">
            {whyUs.list.map((item, idx) => (
              <div key={idx} className={`why-card reveal reveal-delay-${idx+1} tilt-card`}>
                <div className="why-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg></div>
                <h3>{item.title}</h3><p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding" id="results">
        <div className="container">
          <div className="section-header reveal"><div className="section-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px', marginRight: '8px'}}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg> {results.badge}</div><h2 className="section-title">{results.title}</h2><p className="section-subtitle">{results.subtitle}</p></div>
          <div className="portfolio-grid">
            {results.list.map((item, idx) => (
              <div key={idx} className={`portfolio-card reveal reveal-delay-${idx+1} tilt-card`}>
                <div className="portfolio-stat"><div className="portfolio-stat-value">{item.val}</div><div className="portfolio-stat-label">{item.label}</div><div className="portfolio-stat-desc">{item.desc}</div><span className="portfolio-stat-tag">{item.tag}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section-padding" id="testimonials">
        <div className="container">
          <div className="section-header reveal"><div className="section-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px', marginRight: '8px'}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> {testimonials.badge}</div><h2 className="section-title">{testimonials.title}</h2><p className="section-subtitle">{testimonials.subtitle}</p></div>
          <div className="testimonials-grid">
            {testimonials.list.map((item, idx) => (
              <div key={idx} className={`testimonial-card reveal reveal-delay-${idx+1} tilt-card`}>
                <div className="testimonial-stars">{[...Array(5)].map((_, i) => <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                <p className="testimonial-text">"{item.text}"</p>
                <div className="testimonial-author"><div className="testimonial-avatar">{item.initial}</div><div className="testimonial-info"><h4>{item.author}</h4><p>{item.role}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding" id="blog">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px', marginRight: '8px'}}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg> Latest Journal</div>
            <h2 className="section-title">Insights for <span className="gradient-text">Explosive Growth</span></h2>
          </div>
          
          <div className="blog-grid-home">
            {content.blogs.slice(0, 3).map((blog, idx) => (
              <a href={`/blog/${blog.slug}`} key={blog.id} className={`home-blog-card reveal reveal-delay-${idx+1}`}>
                <div className="home-blog-image">
                  <img src={blog.image} alt={blog.title} />
                  <span className="home-blog-tag">{blog.category}</span>
                </div>
                <div className="home-blog-content">
                  <span className="home-blog-date">{blog.date}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '50px' }} className="reveal">
            <a href="/blog" className="btn btn-secondary">View All Articles</a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog-grid-home {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        .home-blog-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: 0.3s ease;
        }
        .home-blog-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(255, 255, 255, 0.04);
        }
        .home-blog-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .home-blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s ease;
        }
        .home-blog-card:hover .home-blog-image img {
          transform: scale(1.1);
        }
        .home-blog-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          padding: 4px 12px;
          background: var(--gradient-primary);
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .home-blog-content {
          padding: 25px;
        }
        .home-blog-date {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          display: block;
          margin-bottom: 10px;
        }
        .home-blog-content h3 {
          font-size: 1.3rem;
          line-height: 1.4;
          margin-bottom: 12px;
        }
        .home-blog-content p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container"><div className="cta-box reveal"><div className="cta-content"><h2>{cta.title}</h2><p>{cta.subtitle}</p><div className="cta-buttons"><a href="/#contact" className="btn btn-primary btn-magnetic">{cta.primaryBtn}</a><a href="/#services" className="btn btn-secondary btn-magnetic">{cta.secondaryBtn}</a></div></div></div></div>
      </section>

      {/* Contact Section */}
      <section className="contact section-padding" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="section-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '18px', height: '18px', marginRight: '8px'}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> {contact.badge}</div>
              <h2>{contact.title}</h2><p>{contact.subtitle}</p>
              <div className="contact-details">
                {contact.details.map((item, idx) => (
                  <div key={idx} className="contact-detail">
                    <div className="contact-detail-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {item.type === 'email' ? <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></> :
                         item.type === 'address' ? <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></> :
                         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />}
                      </svg>
                    </div>
                    <div><h4>{item.title}</h4><p>{item.val}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-form-wrapper reveal reveal-delay-2"><form id="contactForm"><div className="form-group"><label htmlFor="name">Full Name</label><input type="text" id="name" name="name" placeholder="John Doe" required /></div><div className="form-group"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" placeholder="john@company.com" required /></div><div className="form-group"><label htmlFor="message">Your Message</label><textarea id="message" name="message" placeholder="Tell us about your project..." required></textarea></div><button type="submit" className="btn btn-primary form-submit btn-magnetic">Send Message</button><div className="form-success" id="formSuccess">✓ Message sent successfully!</div></form></div>
          </div>
        </div>
      </section>
    </>
  );
}
