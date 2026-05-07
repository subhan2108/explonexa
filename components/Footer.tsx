"use client";

import Link from "next/link";

export default function Footer({ description, socialLinks }: { 
  description?: string; 
  socialLinks?: { twitter: string; linkedin: string; instagram: string } 
}) {
  const desc = description || "Explonexa - Explosive Growth To The Next Level. Full-service digital marketing agency helping businesses scale globally.";
  const socials = socialLinks || {
    twitter: "#",
    linkedin: "#",
    instagram: "#"
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">Explonexa</Link>
            <p>{desc}</p>
            <div className="footer-social">
              <a href={socials.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a href={socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href={socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-link-group">
              <h4>Agency</h4>
              <Link href="/about">About Us</Link>
              <Link href="/services">Services</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/blog">Our Journal</Link>
            </div>
            <div className="footer-link-group">
              <h4>Support</h4>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Explonexa. All rights reserved. Designed for explosive growth.</p>
        </div>
      </div>

      <style jsx>{`
        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }
        .footer-link-group h4 {
          font-size: 1.1rem;
          margin-bottom: 24px;
          color: var(--text-primary);
        }
        .footer-link-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-link-group a {
          color: var(--text-secondary);
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }
        .footer-link-group a:hover {
          color: var(--accent-purple);
        }
        @media (max-width: 768px) {
          .footer-links {
            grid-template-columns: 1fr;
            gap: 30px;
            margin-top: 40px;
          }
        }
      `}</style>
    </footer>
  );
}
