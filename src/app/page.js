"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const cursorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    setParticles(
      [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        animationDuration: `${Math.random() * 5 + 8}s`,
        animationDelay: `${Math.random() * 5}s`
      }))
    );

    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackTop(window.scrollY > 500);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll);

    // Initial setup for interactions and reveals
    const setupDOM = () => {
      const interactives = document.querySelectorAll('a, button, .gallery-item, input, textarea');
      const addLeaf = () => cursorRef.current?.classList.add('tea-leaf');
      const removeLeaf = () => cursorRef.current?.classList.remove('tea-leaf');
      
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', addLeaf);
        el.addEventListener('mouseleave', removeLeaf);
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

      return { interactives, addLeaf, removeLeaf, observer };
    };

    const domSetup = setupDOM();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
      domSetup.interactives.forEach((el) => {
        el.removeEventListener('mouseenter', domSetup.addLeaf);
        el.removeEventListener('mouseleave', domSetup.removeLeaf);
      });
      domSetup.observer.disconnect();
    };
  }, [loading]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleNav = () => setNavActive(!navActive);

  return (
    <>
      {/* Custom Cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>

      {/* Loading Screen */}
      <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
        <div className="loading-content">
          <div className="tea-cup-loader"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <Link href="/">
            <img src="/images/logo.png" alt="TripTea Logo" />
            <span className="brand-name">TripTea</span>
          </Link>
        </div>
        <ul className={`nav-links ${navActive ? 'nav-active' : ''}`}>
          <li><Link href="#home" onClick={() => setNavActive(false)}>Home</Link></li>
          <li><Link href="#story" onClick={() => setNavActive(false)}>Our Story</Link></li>
          <li><Link href="#gallery" onClick={() => setNavActive(false)}>Gallery</Link></li>
          <li><Link href="#contact" onClick={() => setNavActive(false)}>Contact</Link></li>
        </ul>
        <div className="hamburger" onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <img src="/assest/triptea banner.png" alt="Premium Tea" className="hero-bg" />
        <div className="hero-overlay"></div>
        
        {/* Floating Particles */}
        <div className="particles-container">
          {particles.map((style, i) => (
            <div 
              key={i} 
              className="particle" 
              style={style}
            ></div>
          ))}
        </div>

        <div className="hero-content reveal">
          <div className="steam-container">
            <div className="steam"></div>
            <div className="steam"></div>
            <div className="steam"></div>
          </div>
          <h1 className="hero-title">Every Sip Tells A Story</h1>
          <p className="hero-subtitle">
            Crafted with nature, brewed with passion, and served with warmth. 
            Discover handcrafted tea blends inspired by tradition and designed for tea lovers.
          </p>
          <div className="hero-buttons">
            <Link href="#gallery" className="btn btn-primary">Explore Collection</Link>
            <Link href="#story" className="btn btn-secondary">Our Story</Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="section story-section reveal">
        <div className="story-image-col">
          <div style={{ position: 'relative', width: '100%', height: '600px', borderRadius: '10px', overflow: 'hidden' }}>
            <Image src="/assest/tea with steam.avif" alt="Tea Pouring" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className="story-text-col">
          <h2 className="section-title">Our Story</h2>
          <div className="section-divider" style={{ margin: '0 0 2rem 0' }}></div>
          <p>
            Every cup we serve is prepared with care, bringing together tradition, quality, and comfort.
          </p>
          <p>
            We use carefully selected natural ingredients to create rich flavors and a refreshing tea experience for every customer.
          </p>
          <Link href="#contact" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Learn More</Link>
        </div>
      </section>


      {/* Why Choose TripTea */}
      <section className="section features-section">
        <div className="section-header reveal">
          <h2 className="section-title">Why Choose TripTea</h2>
          <div className="section-divider"></div>
        </div>
        <div className="features-grid">
          <div className="feature-box reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="feature-icon"><i className="fi fi-rr-mug-hot"></i></div>
            <h4>Fresh Tea Every Day</h4>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Freshly prepared tea served every day for the best taste and aroma.</p>
          </div>
          <div className="feature-box reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="feature-icon"><i className="fi fi-rr-leaf"></i></div>
            <h4>Natural Ingredients</h4>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Made using carefully selected natural ingredients for authentic flavors.</p>
          </div>
          <div className="feature-box reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="feature-icon"><i className="fi fi-rr-star"></i></div>
            <h4>Comfortable Environment</h4>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Enjoy tea in a peaceful, relaxing, and welcoming atmosphere.</p>
          </div>
          <div className="feature-box reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="feature-icon"><i className="fi fi-rr-hand-holding-heart"></i></div>
            <h4>Made with Care</h4>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Every cup is made with care, bringing warmth, comfort, and the true taste of tea.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section gallery-section">
        <div className="section-header reveal">
          <h2 className="section-title">Gallery</h2>
          <div className="section-divider"></div>
        </div>
        <div className="gallery-grid reveal">
          <div className="gallery-item">
            <img src="/assest/Tea leaves.jpg" alt="Tea leaves" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/tea1.jpg" alt="Forest Harmony" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/gallery.png" alt="Tea cups" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/tea.jpg" alt="Matcha" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/gallery1.png" alt="Herbal tea" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/lemon tea.jpeg" alt="Afternoon tea" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/masala.avif" alt="Tea ceremony" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/photo-1605677594331-28630ceb842d.avif" alt="Tea photography" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/photo-1619581073186-5b4ae1b0caad.avif" alt="Tea pouring photography" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/viber_image_2026-06-18_07-24-29-827.jpg" alt="TripTea experience" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/viber_image_2026-06-18_07-24-29-937.jpg" alt="TripTea moment" />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src="/assest/viber_image_2026-06-18_07-24-29-980.jpg" alt="TripTea atmosphere" />
            <div className="gallery-overlay"></div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="contact-container reveal">
          <div className="contact-info">
            <h2>Let's Brew Something Beautiful Together</h2>
            <p>Have a question or just want to share your tea stories? We would love to hear from you. Stop by our tea house or drop us a message.</p>
            
            <div className="info-item">
              <h4>Address</h4>
              <p>Motichock Tikathai, Serene Valley</p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>+977 9854063100</p>
            </div>
            <div className="info-item">
              <h4>Email</h4>
              <p>triptea2082@gmail.com</p>
            </div>
            <div className="info-item">
              <h4>Opening Hours</h4>
              <p>Everyday: 6:00 AM – 9:00 PM</p>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="btn-submit">Submit Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top reveal">
          <img src="/images/logo.png" alt="TripTea Logo" className="footer-logo" />
          <ul className="footer-links">
            <li><Link href="#home">Home</Link></li>
            <li><Link href="#story">Our Story</Link></li>
            <li><Link href="#gallery">Gallery</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
          <div className="social-icons">
            <a href="https://www.instagram.com/triptea2082?igsh=cGhjbDA4dHIwaXcw" target="_blank" rel="noopener noreferrer">
              <i className="fi fi-brands-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 TripTea. Crafted with warmth.</p>
        </div>
      </footer>

      {/* Back to Top */}
      <div 
        className={`back-to-top ${showBackTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
      >
        <i className="fi fi-rr-mug-hot"></i>
      </div>
    </>
  );
}
