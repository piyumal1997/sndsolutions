// src/components/common/Footer.jsx (Updated & Complete)
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faLocationDot, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { company } from '../../data/company';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-700 text-white py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <FontAwesomeIcon icon={faSun} className="text-4xl" />
              {company.name}
            </h1>
            <p className="text-gray-100">Innovative & Sustainable Development Solutions in Renewable Energy, Automation, and Heavy & General Engineering.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-100 mb-2 font-semibold">Head Office</p>
            <p className="text-gray-100 mb-4">{company.address}</p>
            <p className="text-gray-100 mb-2">Tel: <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-green-300 transition">{company.phone}</a></p>
            <p className="text-gray-100">Email: <a href={`mailto:${company.email}`} className="hover:text-green-300 transition">{company.email}</a></p>
          </div>

          <nav>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <NavLink to="/" className="block text-gray-100 hover:text-green-300 transition">Home</NavLink>
              <NavLink to="/solutions" className="block text-gray-100 hover:text-green-300 transition">Solutions</NavLink>
              <NavLink to="/projects" className="block text-gray-100 hover:text-green-300 transition">Projects</NavLink>
              <NavLink to="/about" className="block text-gray-100 hover:text-green-300 transition">About</NavLink>
              <NavLink to="/contact" className="block text-gray-100 hover:text-green-300 transition">Contact</NavLink>
            </div>
          </nav>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-5">
              <a href={company.social.facebook} aria-label="Facebook" className="text-gray-100 hover:text-green-300 transition">
                <FontAwesomeIcon icon={faFacebookF} className="text-3xl" />
              </a>
              <a href={company.social.instagram} aria-label="Instagram" className="text-gray-100 hover:text-green-300 transition">
                <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
              </a>
              <a href={company.social.tiktok} aria-label="TikTok" className="text-gray-100 hover:text-green-300 transition">
                <FontAwesomeIcon icon={faTiktok} className="text-3xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-600 mt-12 pt-8 text-center">
          <p className="text-sm">© 2026 {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;