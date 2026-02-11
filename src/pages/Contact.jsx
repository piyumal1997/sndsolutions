// src/pages/Contact.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faCheckCircle,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { company } from '../data/company';

import contactBg from '../assets/images/background/contact-bg.jpg'; // ← Add your background image here

const ContactInner = () => {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
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
    setSubmitError(null);
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
        'https://riflxhbxduomczyszbmw.supabase.co/functions/v1/submit-inquiry', // ← Your real Edge Function URL
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            recaptcha_token: token,
          }),
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        console.error('[Frontend] Edge Function error:', response.status, responseText);
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
  };

  return (
    <main className="pt-0 bg-white">
      {/* Hero Section – Same style as SolarEnergy.jsx */}
      <section className="relative h-96 pt-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed" 
          style={{ backgroundImage: `url(${contactBg})` }} // Your background image
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-6 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
              Get in touch for any inquiry – free consultation island-wide.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Contact Info + Form */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                {/* Company Info */}
                <div className="text-center mb-10">
                  <img
                    src={company.logo || '/logo-placeholder.png'}
                    alt={`${company.name} Logo`}
                    className="h-20 mx-auto mb-6 object-contain"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{company.name}</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FontAwesomeIcon icon={faBuilding} className="text-green-600 text-2xl mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Head Office</p>
                      <p className="text-gray-700">{company.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faPhone} className="text-green-600 text-2xl" />
                    <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-green-600 transition">
                      {company.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-green-600 text-2xl" />
                    <a href={`mailto:${company.email}`} className="text-gray-700 hover:text-green-600 transition">
                      {company.email}
                    </a>
                  </div>
                </div>

                {/* Form / Success */}
                <div className="mt-12">
                  {success ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-6xl mb-4" />
                      <h3 className="text-2xl font-bold text-green-700 mb-3">Thank You!</h3>
                      <p className="text-lg text-gray-700">
                        Your inquiry has been sent successfully. We will respond within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition"
                      />
                      {errors.name && <p className="text-red-500 text-sm -mt-2">{errors.name}</p>}

                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition"
                      />
                      {errors.email && <p className="text-red-500 text-sm -mt-2">{errors.email}</p>}

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition"
                      />
                      {errors.phone && <p className="text-red-500 text-sm -mt-2">{errors.phone}</p>}

                      <select
                        name="inquiry_type"
                        value={formData.inquiry_type}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition"
                      >
                        <option value="">Select Inquiry Type *</option>
                        <option value="Home Solar Solutions">Home Solar Solutions</option>
                        <option value="Industry Solar Solutions">Industry Solar Solutions</option>
                        <option value="Automation & Control Systems">Automation & Control Systems</option>
                        <option value="General Engineering">General Engineering</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.inquiry_type && <p className="text-red-500 text-sm -mt-2">{errors.inquiry_type}</p>}

                      <textarea
                        name="message"
                        rows="5"
                        placeholder="Your Message *"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition resize-none"
                      />
                      {errors.message && <p className="text-red-500 text-sm -mt-2">{errors.message}</p>}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-lg font-medium text-lg transition ${
                          isSubmitting
                            ? 'bg-green-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Our Location
              </h2>
              <div
                ref={mapRef}
                className="rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-[500px] relative bg-white"
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Contact = () => (
  <GoogleReCaptchaProvider reCaptchaKey="6Lfxv1gsAAAAAIUJRR_rG5ejpfC-Soh7ga0CMquB">
    <ContactInner />
  </GoogleReCaptchaProvider>
);

export default Contact;