// src/pages/Contact.jsx (Light/White Theme with Sectioned Layout)
import { useState, useEffect, useRef } from 'react';
import { company } from '../data/company';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [success, setSuccess] = useState(false);

  // Lazy loading states for the map
  const mapRef = useRef(null);
  const [mapSrc, setMapSrc] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.785978322663!2d79.85866831477286!3d6.916668395002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591a713c14b9%3A0x1a9c3a7d0b7e6c6e!2sColombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1705480000000";

  // Intersection Observer to load the map only when the section is near/in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapSrc(mapUrl);
            setMapLoaded(false);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '150px' }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <main className="pt-28">
      {/* Hero Section - Light Theme */}
      <section className="relative h-70 bg-gradient-to-r from-green-700 to-emerald-700 flex items-center justify-center">
        {/* <div className="absolute inset-0 bg-white/60"></div> */}
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-white">
            Get in touch for any inquiry – free consultation island-wide.
          </p>
        </div>
      </section>

      {/* Google Map Section - White Background */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Location</h2>

          <div ref={mapRef} className="rounded-xl overflow-hidden shadow-2xl h-96 lg:h-[500px] relative mx-auto max-w-5xl bg-white">
            {!mapSrc ? (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-600">
                <p className="text-xl">Map will load automatically when you scroll here</p>
              </div>
            ) : (
              <>
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location - Google Maps"
                  onLoad={handleMapLoad}
                />

                {!mapLoaded && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <div className="text-center">
                      <svg className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-lg text-gray-700">Loading map...</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Details & Form Section - White Background */}
      <section className="py-20 bg-gradient-to-r from-green-100 to-emerald-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Get in Touch</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6 text-lg">
                {/* Address */}
                <p className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faLocationDot} className="text-green-600 text-3xl" />
                  <span className="text-gray-700 font-bold">{company.address}</span>
                </p>

                {/* Phone */}
                <p className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faPhone} className="text-green-600 text-3xl" />
                  <span className="text-gray-700 font-bold">{company.phone}</span>
                </p>

                {/* Email */}
                <p className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faEnvelope} className="text-green-600 text-3xl" />
                  <span className="text-gray-700 font-bold">{company.email}</span>
                </p>
              </div>
            </div>

            <div>
              {!success ? (
                <form onSubmit={handleSubmit} className="bg-gray-50/60 backdrop-blur-sm rounded-xl p-8 space-y-6 shadow-lg">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-green-600 focus:outline-none transition"
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    required
                    className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-green-600 focus:outline-none transition"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-green-600 focus:outline-none transition"
                  />
                  <select className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-green-600 focus:outline-none transition">
                    <option>Select Inquiry Type *</option>
                    <option>Home Solar Solutions</option>
                    <option>Industry Solar Solutions</option>
                    <option>Automation & Control Systems</option>
                    <option>General Engineering</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    rows="5"
                    placeholder="Your Message *"
                    required
                    className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-green-600 focus:outline-none transition resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-medium text-lg hover:bg-green-700 transition"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 rounded-xl p-12 text-center shadow-lg">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-6xl mb-4" />
                  <h3 className="text-3xl font-bold text-green-700 mb-4">Thank You!</h3>
                  <p className="text-xl text-gray-700">Your inquiry has been sent. We'll respond within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;