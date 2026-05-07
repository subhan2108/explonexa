"use client";

import { ServicesData, CtaData } from "@/lib/data-service";
import Link from "next/link";

interface ServicesClientProps {
  services: ServicesData;
  cta: CtaData;
}

export default function ServicesClient({ services, cta }: ServicesClientProps) {
  return (
    <div className="services-page">
      <section className="inner-hero section-padding">
        <div className="container">
          <div className="hero-content reveal">
            <div className="section-badge">{services.badge}</div>
            <h1 className="hero-title">Elevate Your Brand with <span className="gradient-text">Expert Services</span></h1>
            <p className="hero-subtitle">We provide end-to-end digital marketing solutions tailored to your business goals. From SEO to High-End Video Production, we've got you covered.</p>
          </div>
        </div>
      </section>

      <section className="services-detailed section-padding">
        <div className="container">
          <div className="services-list-detailed">
            {services.list.map((service, idx) => (
              <div key={idx} className={`service-detail-item reveal ${idx % 2 === 1 ? 'reverse' : ''}`}>
                <div className="service-detail-content">
                  <div className="service-number">0{idx + 1}</div>
                  <h2>{service.title}</h2>
                  <p>{service.desc}</p>
                  <ul className="service-features-list">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn btn-secondary btn-magnetic">Inquire Now</Link>
                </div>
                <div className="service-detail-visual tilt-card">
                  <div className="visual-box">
                    <div className="visual-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                       </svg>
                    </div>
                    <div className="visual-glow"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box reveal">
            <div className="cta-content">
              <h2>{cta.title}</h2>
              <p>{cta.subtitle}</p>
              <div className="cta-buttons">
                <Link href="/contact" className="btn btn-primary btn-magnetic">{cta.primaryBtn}</Link>
                <Link href="/about" className="btn btn-secondary btn-magnetic">Learn More About Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .inner-hero {
          padding-top: 180px;
          text-align: center;
          background: radial-gradient(circle at top, rgba(139, 92, 246, 0.1), transparent 50%);
        }
        .services-list-detailed {
          display: flex;
          flex-direction: column;
          gap: 120px;
        }
        .service-detail-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .service-detail-item.reverse {
          direction: rtl;
        }
        .service-detail-item.reverse .service-detail-content {
          direction: ltr;
        }
        .service-number {
          font-family: var(--font-space-grotesk);
          font-size: 4rem;
          font-weight: 900;
          opacity: 0.1;
          line-height: 1;
          margin-bottom: -10px;
        }
        .service-detail-content h2 {
          font-size: 2.5rem;
          margin-bottom: 24px;
        }
        .service-detail-content p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.8;
        }
        .service-features-list {
          list-style: none;
          margin-bottom: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .service-features-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .service-features-list svg {
          width: 18px;
          height: 18px;
          color: var(--accent-blue);
        }
        .service-detail-visual {
          position: relative;
          height: 450px;
          width: 100%;
        }
        .visual-box {
          height: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .visual-icon {
          width: 120px;
          height: 120px;
          color: var(--accent-purple);
          opacity: 0.5;
        }
        .visual-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          background: var(--accent-blue);
          filter: blur(100px);
          opacity: 0.2;
          bottom: -50px;
          right: -50px;
        }
        @media (max-width: 991px) {
          .service-detail-item {
            grid-template-columns: 1fr;
            gap: 50px;
            text-align: center;
          }
          .service-detail-item.reverse {
            direction: ltr;
          }
          .service-features-list {
            justify-items: center;
          }
          .service-detail-visual {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
