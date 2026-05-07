"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled || mobileMenuOpen ? "scrolled" : ""}`} id="navbar">
        <div className="container">
          <Link href="/" className="logo" onClick={closeMenu}>
            Explonexa
          </Link>
          <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`} id="navLinks">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={pathname === link.href ? "active-link" : ""}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="nav-cta" onClick={closeMenu}>
              Get Started
            </Link>
          </div>
          <div 
            className={`menu-toggle ${mobileMenuOpen ? "active" : ""}`} 
            id="menuToggle"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      <div 
        className={`nav-overlay ${mobileMenuOpen ? "active" : ""}`} 
        id="navOverlay"
        onClick={closeMenu}
      ></div>

      <style jsx>{`
        .active-link {
          color: var(--text-primary) !important;
        }
        .active-link::after {
          width: 100% !important;
        }
        @media (max-width: 991px) {
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: var(--bg-secondary);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
            transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
            z-index: 1000;
            padding: 40px;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
          }
          .nav-links.active {
            right: 0;
          }
          .menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
