"use client";

import { useEffect } from "react";

export default function VisualEffects() {
  useEffect(() => {
    // PRELOADER
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderPercent = document.getElementById('preloaderPercent');
    let progress = 0;
    
    function updateLoader() {
      progress += Math.random() * 15; 
      if (progress > 100) progress = 100;
      if (preloaderFill) preloaderFill.style.width = progress + '%';
      if (preloaderPercent) preloaderPercent.textContent = Math.floor(progress) + '%';
      
      if (progress < 100) { 
        setTimeout(updateLoader, 100 + Math.random() * 200); 
      } else { 
        setTimeout(() => { 
          preloader?.classList.add('hidden'); 
        }, 400); 
      }
    }
    updateLoader();

    // CUSTOM CURSOR
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;
    
    const onMouseMove = (e: MouseEvent) => { 
      mouseX = e.clientX; 
      mouseY = e.clientY; 
      if (dot) { 
        dot.style.left = mouseX + 'px'; 
        dot.style.top = mouseY + 'px'; 
      } 
    };
    
    document.addEventListener('mousemove', onMouseMove);
    
    let cursorAnimationId: number;
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15; 
      outlineY += (mouseY - outlineY) * 0.15;
      if (outline) { 
        outline.style.left = outlineX + 'px'; 
        outline.style.top = outlineY + 'px'; 
      }
      cursorAnimationId = requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    const setupCursorHovers = () => {
      const hoverElements = document.querySelectorAll('a, button, .service-card, .why-card, .portfolio-card, .testimonial-card, .about-feature, .contact-detail, .pricing-card');
      const onMouseEnter = () => outline?.classList.add('hover');
      const onMouseLeave = () => outline?.classList.remove('hover');
      hoverElements.forEach(el => { 
        el.addEventListener('mouseenter', onMouseEnter); 
        el.addEventListener('mouseleave', onMouseLeave); 
      });
    };
    
    setupCursorHovers();
    
    // Observer for dynamic elements
    const observer = new MutationObserver(() => {
      setupCursorHovers();
      observeReveals();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // SCROLL PROGRESS
    const scrollBar = document.getElementById('scrollProgress');
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (scrollBar) scrollBar.style.width = scrollPercent + '%';
      
      const scrollTopBtn = document.getElementById('scrollTop');
      if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
      }
      
      const aurora = document.querySelector('.aurora-bg') as HTMLElement;
      if (aurora) aurora.style.transform = `translateY(${window.scrollY * 0.1}px)`;
    };
    window.addEventListener('scroll', onScroll);

    // REVEAL ANIMATIONS
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { 
        if (entry.isIntersecting) entry.target.classList.add('active'); 
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    const observeReveals = () => {
      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    };
    observeReveals();

    // TILT & MAGNETIC EFFECTS
    const setupInteractions = () => {
      document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e: any) => {
          const rect = card.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
          const centerX = rect.width / 2, centerY = rect.height / 2;
          (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${((y - centerY) / centerY) * -8}deg) rotateY(${((x - centerX) / centerX) * 8}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => { 
          (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'; 
        });
      });

      document.querySelectorAll('.btn-magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e: any) => {
          const rect = btn.getBoundingClientRect();
          (btn as HTMLElement).style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.15}px, ${(e.clientY - rect.top - rect.height / 2) * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => { 
          (btn as HTMLElement).style.transform = 'translate(0, 0)'; 
        });
      });
    };
    setupInteractions();

    document.getElementById('scrollTop')?.addEventListener('click', () => { 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(cursorAnimationId);
      revealObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="cursor-outline" id="cursorOutline"></div>
      <div className="scroll-progress" id="scrollProgress"></div>
      <div className="preloader" id="preloader">
        <div className="preloader-content">
          <div className="preloader-logo">Explonexa</div>
          <div className="preloader-bar">
            <div className="preloader-bar-fill" id="preloaderFill"></div>
          </div>
          <div className="preloader-percent" id="preloaderPercent">0%</div>
        </div>
      </div>
      <div className="aurora-bg">
        <div className="aurora-blob"></div>
        <div className="aurora-blob"></div>
        <div className="aurora-blob"></div>
        <div className="aurora-blob"></div>
      </div>
      <div className="grid-overlay"></div>
      <button className="scroll-top" id="scrollTop" aria-label="Scroll to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
      <div className="whatsapp-float">
        <a href="https://wa.me/15551234567" className="whatsapp-btn" aria-label="Chat">
          <svg viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </>
  );
}
