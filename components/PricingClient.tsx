"use client";

import Link from "next/link";

export default function PricingClient() {
  const tiers = [
    {
      name: "Starter",
      price: "999",
      desc: "Perfect for small businesses looking to establish their digital presence.",
      features: [
        "SEO Audit & Strategy",
        "Social Media Management (2 channels)",
        "Basic Google Ads Setup",
        "Monthly Performance Reports",
        "Email Support"
      ],
      color: "var(--accent-blue)",
      popular: false
    },
    {
      name: "Growth",
      price: "2499",
      desc: "Comprehensive solution for scaling businesses and aggressive growth.",
      features: [
        "Full SEO Optimization",
        "Social Media Management (4 channels)",
        "Advanced Ads Management",
        "Content Marketing Plan",
        "Bi-weekly Strategy Calls",
        "Priority Support"
      ],
      color: "var(--accent-purple)",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Custom-tailored strategies for global brands and large enterprises.",
      features: [
        "Global Brand Strategy",
        "Multi-region SEO",
        "Unlimited Ads Management",
        "High-End Video Production",
        "Dedicated Account Manager",
        "24/7 Premium Support"
      ],
      color: "var(--accent-pink)",
      popular: false
    }
  ];

  return (
    <div className="pricing-page">
      <section className="inner-hero section-padding">
        <div className="container">
          <div className="hero-content reveal">
            <div className="section-badge">Flexible Plans</div>
            <h1 className="hero-title">Invest in Your <span className="gradient-text">Future Success</span></h1>
            <p className="hero-subtitle">Transparent pricing with no hidden fees. Choose the plan that aligns with your growth trajectory.</p>
          </div>
        </div>
      </section>

      <section className="pricing-section section-padding">
        <div className="container">
          <div className="pricing-grid">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`pricing-card reveal reveal-delay-${idx+1} ${tier.popular ? 'popular' : ''} tilt-card`}>
                {tier.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3>{tier.name}</h3>
                  <div className="price">
                    {tier.price !== "Custom" && <span className="currency">$</span>}
                    <span className="amount">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="period">/mo</span>}
                  </div>
                  <p>{tier.desc}</p>
                </div>
                <div className="pricing-body">
                  <ul className="pricing-features">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-footer">
                  <Link 
                    href="/contact" 
                    className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'} btn-magnetic`}
                    style={{ width: '100%' }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section section-padding">
        <div className="container">
          <div className="section-header reveal">
             <div className="section-badge">FAQ</div>
             <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>
          <div className="faq-grid reveal">
             {[
               { q: "How long are the contracts?", a: "We typically work on a month-to-month basis, but we offer discounts for 6-month and 12-month commitments." },
               { q: "Can I switch plans later?", a: "Absolutely! You can upgrade or downgrade your plan at any time to match your business needs." },
               { q: "Do you offer custom packages?", a: "Yes, our Enterprise plan is fully customizable. Contact us to discuss your specific requirements." },
               { q: "When will I see results?", a: "While some results like ad performance are immediate, SEO and organic growth typically take 3-6 months to fully manifest." }
             ].map((faq, i) => (
               <div key={i} className="faq-item">
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
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
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          align-items: flex-start;
        }
        .pricing-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 50px 40px;
          position: relative;
          transition: 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .pricing-card.popular {
          border-color: var(--accent-purple);
          transform: scale(1.05);
          z-index: 2;
          background: rgba(139, 92, 246, 0.03);
        }
        .popular-badge {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--gradient-primary);
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          white-space: nowrap;
        }
        .pricing-header h3 {
          font-size: 1.8rem;
          margin-bottom: 24px;
        }
        .price {
          margin-bottom: 24px;
          display: flex;
          align-items: baseline;
        }
        .currency {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .amount {
          font-size: 3.5rem;
          font-weight: 800;
          font-family: var(--font-space-grotesk);
          color: var(--text-primary);
        }
        .period {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-left: 4px;
        }
        .pricing-header p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 40px;
        }
        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 50px;
        }
        .pricing-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.95rem;
        }
        .pricing-features svg {
          width: 18px;
          height: 18px;
          color: var(--accent-blue);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-top: 60px;
        }
        .faq-item h4 {
          font-size: 1.2rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }
        .faq-item p {
          color: var(--text-secondary);
          line-height: 1.7;
        }
        @media (max-width: 991px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .pricing-card.popular {
            transform: scale(1);
          }
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
