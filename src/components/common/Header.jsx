// src/components/common/Header.jsx
import { useState, useRef, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faPhoneAlt, faEnvelope, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { company } from '../../data/company';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const topBarRef = useRef(null);
  const headerRef = useRef(null);
  const [headerTop, setHeaderTop] = useState(60);

  const updateHeights = () => {
    let topHeight = 60;
    if (topBarRef.current) {
      topHeight = topBarRef.current.offsetHeight;
      setHeaderTop(topHeight);
    }
    let mainHeight = 80;
    if (headerRef.current) {
      mainHeight = headerRef.current.offsetHeight;
    }
    const totalHeight = topHeight + mainHeight;
    document.documentElement.style.setProperty('--total-header-height', `${totalHeight}px`);
  };

  useLayoutEffect(() => {
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, []);

  return (
    <>
      {/* Top Contact Bar */}
      <div
        ref={topBarRef}
        className="fixed top-0 left-0 right-0 bg-gray-900 text-gray-50 py-3 text-sm z-50"
        role="complementary"
      >
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-5 order-2 sm:order-1">
            <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition">
              <FontAwesomeIcon icon={faPhoneAlt} className="text-base" />
              <span>{company.phone}</span>
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white transition">
              <FontAwesomeIcon icon={faEnvelope} className="text-base" />
              <span>{company.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4 order-1 sm:order-2 hidden sm:flex">
            <a href={company.social.facebook} aria-label="Facebook" className="hover:text-white transition">
              <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
            </a>
            <a href={company.social.instagram} aria-label="Instagram" className="hover:text-white transition">
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
            <a href={company.social.tiktok} aria-label="TikTok" className="hover:text-white transition">
              <FontAwesomeIcon icon={faTiktok} className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        ref={headerRef}
        className="fixed left-0 right-0 bg-white shadow-lg z-40 transition-all duration-300"
        style={{ top: `${headerTop}px` }}
      >
        <div className="container mx-auto px-6 py-3 md:py-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-10 md:h-14 w-auto object-contain"
            />
            {/* Optional: Show company name beside logo on larger screens */}
            {/* <h1 className="hidden md:block text-xl md:text-2xl font-bold text-gray-900">{company.name}</h1> */}
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600 font-medium transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/solutions"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600 font-medium transition"
              }
            >
              Solutions
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600 font-medium transition"
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600 font-medium transition"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600 font-medium transition"
              }
            >
              Contact
            </NavLink>
          </nav>

          <a
            href="/contact"
            className="hidden md:block bg-green-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-green-700 transition shadow-md"
          >
            Get Quote
          </a>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-700">
            <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} className="text-3xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full bg-white shadow-lg border-t z-50">
            <div className="container mx-auto px-6 py-5 flex flex-col gap-3">
              <NavLink to="/" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-green-600 font-medium py-2">
                Home
              </NavLink>
              <NavLink to="/solutions" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-green-600 font-medium py-2">
                Solutions
              </NavLink>
              <NavLink to="/projects" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-green-600 font-medium py-2">
                Projects
              </NavLink>
              <NavLink to="/about" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-green-600 font-medium py-2">
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-green-600 font-medium py-2">
                Contact
              </NavLink>
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="bg-green-600 text-white px-6 py-3 rounded-full font-medium text-center hover:bg-green-700 transition mt-2"
              >
                Get Quote
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;