// src/pages/Contact.jsx (Updated & Complete with Google Map)
import { useState } from 'react';
import { company } from '../data/company';

const Contact = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <section className="pt-32 py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">Get in touch for any inquiry – free consultation island-wide.</p>

        {/* Google Map */}
        <div className="mb-20 rounded-xl overflow-hidden shadow-2xl h-96">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.785978322663!2d79.85866831477286!3d6.916668395002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591a713c14b9%3A0x1a9c3a7d0b7e6c6e!2sColombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1705480000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold">Get in Touch</h3>
            <div className="space-y-6 text-lg">
              <p className="flex items-center gap-4">
                <i className="fas fa-location-dot text-green-400 text-3xl"></i>
                <span>{company.address}</span>
              </p>
              <p className="flex items-center gap-4">
                <i className="fas fa-phone-alt text-green-400 text-3xl"></i>
                <span>{company.phone}</span>
              </p>
              <p className="flex items-center gap-4">
                <i className="fas fa-envelope text-green-400 text-3xl"></i>
                <span>{company.email}</span>
              </p>
            </div>
          </div>

          <div>
            {!success ? (
              <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 space-y-6">
                <input type="text" placeholder="Your Name *" required className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 transition" />
                <input type="email" placeholder="Your Email *" required className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 transition" />
                <input type="tel" placeholder="Your Phone" className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 transition" />
                <select className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 transition">
                  <option>Select Inquiry Type *</option>
                  <option>Home Solar Solutions</option>
                  <option>Industry Solar Solutions</option>
                  <option>Automation & Control Systems</option>
                  <option>General Engineering</option>
                  <option>Other</option>
                </select>
                <textarea rows="5" placeholder="Your Message *" required className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 transition resize-none"></textarea>
                <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-lg font-medium text-lg hover:bg-green-700 transition">Send Message</button>
              </form>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 text-center">
                <i className="fas fa-check-circle text-green-400 text-6xl mb-4"></i>
                <h3 className="text-3xl font-bold text-green-400 mb-4">Thank You!</h3>
                <p className="text-xl">Your inquiry has been sent. We'll respond within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;