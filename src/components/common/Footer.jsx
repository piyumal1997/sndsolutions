// src/components/common/Footer.jsx (Balanced columns, better logo sizing & visibility)
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { company } from '../../data/company';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-700 text-white py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-auto lg:gap-12">
          {/* Company Info + Logo - Slightly wider on desktop if needed */}
          <div className="md:col-span-2 mt-4 lg:col-span-1"> {/* or md:col-span-2 if you want it dominant */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-14 md:h-20 w-auto object-contain" // Reduced from h-20 → better balance
              />
              {/* <h1 className="text-2xl md:text-2xl font-bold whitespace-nowrap">{company.name}</h1> Visible on all sizes */}
            </div>
            <p className="text-gray-50 text-sm md:text-base leading-relaxed">
              Innovative & Sustainable Development Solutions in Solar & Energy Systems, Advanced Engineering & Automation and Heavy & General Engineering.
            </p>
          </div>

          {/* Contact - Compact */}
          <div className="mt-4">
            <h3 className="text-lg md:text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-50 mb-2 font-semibold text-sm md:text-base">Head Office</p>
            <p className="text-gray-50 mb-4 text-sm md:text-base">{company.address}</p>
            <p className="text-gray-50 mb-2 text-sm md:text-base">
              Tel: <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-green-300 transition">{company.phone}</a>
            </p>
            <p className="text-gray-50 text-sm md:text-base">
              Email: <a href={`mailto:${company.email}`} className="hover:text-green-300 transition">{company.email}</a>
            </p>
          </div>

          {/* Quick Links */}
          <nav className="mt-4">
            <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm md:text-base">
              <NavLink to="/" className="block text-gray-50 hover:text-green-300 transition">Home</NavLink>
              <NavLink to="/solutions" className="block text-gray-50 hover:text-green-300 transition">Solutions</NavLink>
              <NavLink to="/projects" className="block text-gray-50 hover:text-green-300 transition">Projects</NavLink>
              <NavLink to="/about" className="block text-gray-50 hover:text-green-300 transition">About</NavLink>
              <NavLink to="/contact" className="block text-gray-50 hover:text-green-300 transition">Contact</NavLink>
            </div>
          </nav>

          {/* Social Media */}
          <div className="mt-4">
            <h3 className="text-lg md:text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-6">
              <a href={company.social.facebook} aria-label="Facebook" className="text-gray-50 hover:text-green-300 transition" target="_blank">
                <FontAwesomeIcon icon={faFacebookF} className="text-3xl" />
              </a>
              <a href={company.social.instagram} aria-label="Instagram" className="text-gray-50 hover:text-green-300 transition" target="_blank">
                <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
              </a>
              <a href={company.social.linkedin} aria-label="LinkedIn" className="text-gray-50 hover:text-green-300 transition" target="_blank">
                <FontAwesomeIcon icon={faLinkedinIn} className="text-3xl" />
              </a>
              <a href={company.social.tiktok} aria-label="TikTok" className="text-gray-50 hover:text-green-300 transition" target="_blank">
                <FontAwesomeIcon icon={faTiktok} className="text-3xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-600 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;