"use client";

import { AboutData, WhyUsData } from "@/lib/data-service";
import Link from "next/link";

interface AboutClientProps {
  about: AboutData;
  whyUs: WhyUsData;
}

export default function AboutClient({ about, whyUs }: AboutClientProps) {
  return (
    <div className="about-page">
      <section className="inner-hero section-padding">
        <div className="container">
          <div className="hero-content reveal">
            <div className="section-badge">{about.badge}</div>
            <h1 className="hero-title">Architects of <span className="gradient-text">Digital Excellence</span></h1>
            <p className="hero-subtitle">Explonexa was founded on a simple principle: to help brands navigate the complex digital landscape and achieve explosive growth through data and creativity.</p>
          </div>
        </div>
      </section>

      <section className="about-story section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-content reveal">
              <h2>Our Story</h2>
              <p>{about.description1}</p>
              <p>{about.description2}</p>
              <p>We don't just provide services; we build partnerships. Our success is measured by the growth of our clients, and we take pride in being the catalyst for their digital transformation.</p>
            </div>
            <div className="about-visual reveal reveal-delay-2">
               <div className="about-stats-grid">
                  {about.metrics.map((m, i) => (
                    <div key={i} className="about-stat-box tilt-card">
                       <div className="stat-value">{m.value}+</div>
                       <div className="stat-label">{m.label}</div>
                    </div>
                  ))}
                  <div className="about-stat-box tilt-card">
                       <div className="stat-value">24/7</div>
                       <div className="stat-label">Support</div>
                    </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section section-padding">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Our Core Values</div>
            <h2 className="section-title">What Drives <span className="gradient-text">Explonexa</span></h2>
          </div>
          <div className="values-grid">
            <div className="value-card reveal reveal-delay-1 tilt-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <h3>Innovation First</h3>
              <p>We stay ahead of the curve, constantly experimenting with new technologies and strategies to give our clients a competitive edge.</p>
            </div>
            <div className="value-card reveal reveal-delay-2 tilt-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              </div>
              <h3>Global Mindset</h3>
              <p>Our strategies are designed to scale. We help businesses expand their reach across borders and cultures.</p>
            </div>
            <div className="value-card reveal reveal-delay-3 tilt-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h3>Collaborative Spirit</h3>
              <p>We work as an extension of your team. Transparent communication and shared goals are at the heart of our process.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section section-padding">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">The Experts</div>
            <h2 className="section-title">Meet the <span className="gradient-text">Visionaries</span></h2>
          </div>
          <div className="team-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`team-card reveal reveal-delay-${i}`}>
                 <div className="team-image">
                    <div className="image-placeholder"></div>
                 </div>
                 <div className="team-info">
                    <h4>Visionary {i}</h4>
                    <p>Creative Director</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .inner-hero {
          padding-top: 180px;
          text-align: center;
        }
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .about-stat-box {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 40px;
          border-radius: var(--radius-md);
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .stat-value {
          font-family: var(--font-space-grotesk);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent-purple);
          margin-bottom: 8px;
        }
        .stat-label {
          color: var(--text-secondary);
          font-weight: 500;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 50px;
        }
        .value-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 40px;
          border-radius: var(--radius-lg);
          transition: 0.3s ease;
        }
        .value-icon {
          width: 50px;
          height: 50px;
          color: var(--accent-blue);
          margin-bottom: 24px;
        }
        .value-card h3 {
          font-size: 1.5rem;
          margin-bottom: 16px;
        }
        .value-card p {
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        .team-card {
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: 0.3s ease;
        }
        .team-image {
          height: 300px;
          background: rgba(255, 255, 255, 0.05);
          position: relative;
        }
        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
        }
        .team-info {
          padding: 24px;
          text-align: center;
        }
        .team-info h4 {
          font-size: 1.2rem;
          margin-bottom: 4px;
        }
        .team-info p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        @media (max-width: 991px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
