"use client";

import { ContactData } from "@/lib/data-service";

interface ContactClientProps {
  contact: ContactData;
}

export default function ContactClient({ contact }: ContactClientProps) {
  return (
    <div className="contact-page">
      <section className="inner-hero section-padding">
        <div className="container">
          <div className="hero-content reveal">
            <div className="section-badge">{contact.badge}</div>
            <h1 className="hero-title">Let's Build Something <span className="gradient-text">Explosive</span></h1>
            <p className="hero-subtitle">Ready to take your business to the next level? Get in touch with our experts today and let's start the conversation.</p>
          </div>
        </div>
      </section>

      <section className="contact-main section-padding">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info reveal">
              <h2>Contact Information</h2>
              <p>Reach out to us through any of these channels, and our team will get back to you within 24 hours.</p>
              
              <div className="contact-details-large">
                {contact.details.map((item, idx) => (
                  <div key={idx} className="contact-detail-large-item tilt-card">
                    <div className="detail-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {item.type === 'email' ? <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></> :
                         item.type === 'address' ? <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></> :
                         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />}
                      </svg>
                    </div>
                    <div className="detail-content">
                       <h4>{item.title}</h4>
                       <p>{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-connect reveal reveal-delay-2">
                 <h3>Follow Our Journey</h3>
                 <div className="footer-social" style={{ justifyContent: 'flex-start', marginTop: '20px' }}>
                    <a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg></a>
                    <a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
                    <a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
                 </div>
              </div>
            </div>

            <div className="contact-form-card reveal reveal-delay-2">
               <div className="form-header">
                  <h3>Send a Message</h3>
                  <p>Fill out the form below and we'll be in touch shortly.</p>
               </div>
               <form id="contactForm" className="contact-page-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" name="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject">
                      <option>General Inquiry</option>
                      <option>SEO Services</option>
                      <option>Web Development</option>
                      <option>Ads Management</option>
                      <option>Content Strategy</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" placeholder="How can we help you?" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-magnetic" style={{ width: '100%' }}>Send Message</button>
                  <div className="form-success" id="formSuccess">✓ Your message has been sent successfully!</div>
               </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .inner-hero {
          padding-top: 180px;
          text-align: center;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 100px;
        }
        .contact-info h2 {
          font-size: 2.5rem;
          margin-bottom: 24px;
        }
        .contact-info > p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 60px;
        }
        .contact-details-large {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 60px;
        }
        .contact-detail-large-item {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 30px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 24px;
          backdrop-filter: blur(10px);
        }
        .detail-icon {
          width: 60px;
          height: 60px;
          background: rgba(59, 130, 246, 0.1);
          color: var(--accent-blue);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .detail-icon svg {
          width: 30px;
          height: 30px;
        }
        .detail-content h4 {
          font-size: 1.1rem;
          margin-bottom: 4px;
          color: var(--text-primary);
        }
        .detail-content p {
          color: var(--text-secondary);
        }
        .contact-form-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 60px;
          box-shadow: var(--shadow-card);
        }
        .form-header h3 {
          font-size: 2rem;
          margin-bottom: 12px;
        }
        .form-header p {
          color: var(--text-secondary);
          margin-bottom: 40px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group {
          margin-bottom: 24px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .form-group input, 
        .form-group select, 
        .form-group textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 14px 20px;
          color: white;
          font-family: inherit;
          font-size: 1rem;
          transition: 0.3s ease;
        }
        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-purple);
          background: rgba(255, 255, 255, 0.06);
        }
        .form-group textarea {
          height: 150px;
          resize: none;
        }
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 20px center;
          background-size: 16px;
        }
        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .contact-form-card {
            padding: 40px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
