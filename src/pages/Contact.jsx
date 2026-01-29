// src/pages/ContactSupabase.jsx
// Updated: Improved reCAPTCHA handling with debug logs, better error feedback,
// and proper fetch to Edge Function. Assumes Edge Function is named 'submit-inquiry'
// and deployed at /functions/v1/submit-inquiry

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase'; // Not used for insert anymore (using Edge Function)
import { company } from '../data/company';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';

const ContactSupabaseInner = () => {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null); // For showing errors to user
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const { executeRecaptcha } = useGoogleReCaptcha();

  const mapRef = useRef(null);
  const [mapSrc, setMapSrc] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.785978322663!2d79.85866831477286!3d6.916668395002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591a713c14b9%3A0x1a9c3a7d0b7e6c6e!2sColombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1705480000000';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapSrc(mapUrl);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '150px' }
    );

    if (mapRef.current) observer.observe(mapRef.current);

    return () => {
      if (mapRef.current) observer.unobserve(mapRef.current);
    };
  }, []);

  const handleMapLoad = () => setMapLoaded(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError(null); // Clear previous submission errors
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number (10-15 digits)';
    }
    if (!formData.inquiry_type) newErrors.inquiry_type = 'Please select inquiry type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!executeRecaptcha) {
      setSubmitError('reCAPTCHA not loaded. Please refresh the page.');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('[Frontend] Generating reCAPTCHA token...');
      const token = await executeRecaptcha('inquiryForm');

      console.log('[Frontend] reCAPTCHA token generated:', token.substring(0, 30) + '...');
      console.log('[Frontend] Token length:', token.length);

      if (!token || token.length < 50) {
        throw new Error('Failed to generate reCAPTCHA token');
      }

      const response = await fetch(
        'https://riflxhbxduomczyszbmw.supabase.co/functions/v1/submit-inquiry', // ← REPLACE WITH YOUR REAL PROJECT REF
        {
          method: 'POST',
          // headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            recaptcha_token: token,
          }),
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        console.error('[Frontend] Edge Function error response:', response.status, responseText);
        throw new Error(responseText || 'Submission failed');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiry_type: '',
        message: '',
      });
    } catch (err) {
      console.error('[Frontend] Submission error:', err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }

    console.log('[Frontend Submission]' + formData);
  };

  return (
    <main className="pt-0">
      {/* Hero */}
      <section className="relative h-64 sm:h-72 md:h-80 lg:h-84 bg-gradient-to-r from-green-700 to-emerald-700 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-white">
            Get in touch for any inquiry – free consultation island-wide.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-7xl mx-auto">
            {/* Contact & Form */}
            <section className="w-full md:w-1/2 order-1 md:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-900">
                Get in Touch
              </h2>

              <div className="space-y-6 md:space-y-8">
                {/* Company Info */}
                <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 space-y-4">
                  <div className="flex justify-center mb-4">
                    <img
                      src={company.logo}
                      alt={`${company.name} Logo`}
                      className="h-12 sm:h-16 w-auto object-contain"
                    />
                  </div>
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faBuilding} className="text-green-600 text-xl" />
                    <span className="text-lg font-bold text-black">{company.name}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faLocationDot} className="text-green-600 text-xl" />
                    <span className="text-black">{company.address}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faPhone} className="text-green-600 text-xl" />
                    <span className="text-black">
                      Tel:{' '}
                      <a
                        href={`tel:${company.phone.replace(/\s/g, '')}`}
                        className="text-red-500 hover:text-gray-800"
                      >
                        {company.phone}
                      </a>
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faEnvelope} className="text-green-600 text-xl" />
                    <span className="text-black">
                      Email:{' '}
                      <a href={`mailto:${company.email}`} className="hover:text-gray-800">
                        {company.email}
                      </a>
                    </span>
                  </p>
                </div>

                {/* Form / Success */}
                <div>
                  {success ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center shadow-lg">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-6xl mb-4" />
                      <h3 className="text-3xl font-bold text-green-700 mb-4">Thank You!</h3>
                      <p className="text-xl text-gray-700">
                        Your inquiry has been sent. We'll respond within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 space-y-5">
                      {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
                          {submitError}
                        </div>
                      )}

                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                      <select
                        name="inquiry_type"
                        value={formData.inquiry_type}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      >
                        <option value="">Select Inquiry Type *</option>
                        <option value="Home Solar Solutions">Home Solar Solutions</option>
                        <option value="Industry Solar Solutions">Industry Solar Solutions</option>
                        <option value="Automation & Control Systems">Automation & Control Systems</option>
                        <option value="General Engineering">General Engineering</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.inquiry_type && <p className="text-red-500 text-sm">{errors.inquiry_type}</p>}

                      <textarea
                        rows="5"
                        name="message"
                        placeholder="Your Message *"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none resize-none"
                      />
                      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-green-600 text-white py-4 rounded-lg font-medium text-lg transition ${
                          isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-700'
                        }`}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>

            {/* Map */}
            <section className="w-full md:w-1/2 order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-900">
                Our Location
              </h2>
              <div
                ref={mapRef}
                className="rounded-xl overflow-hidden shadow-2xl h-80 sm:h-96 md:h-[500px] lg:h-[600px] relative bg-white"
              >
                {!mapSrc ? (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <p className="text-xl">Map loads when in view</p>
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
                      title="Company Location"
                      onLoad={handleMapLoad}
                    />
                    {!mapLoaded && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <p className="text-lg text-gray-700">Loading map...</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

const Contact = () => (
  <GoogleReCaptchaProvider reCaptchaKey="6Lfxv1gsAAAAAIUJRR_rG5ejpfC-Soh7ga0CMquB">
    {/* Use real key in production; this is Google's test key for debugging */}
    <ContactSupabaseInner />
  </GoogleReCaptchaProvider>
);

export default Contact;