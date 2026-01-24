// src/pages/Solutions.jsx
import { Link } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Solutions = () => {
  return (
    <main className="pt-0 bg-white">
      {/* Hero Section */}
      <section className="relative h-70 bg-gradient-to-r from-green-700 to-emerald-700 flex items-center justify-center">
        {/* <div className="absolute inset-0 bg-white/60"></div> */}
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Innovative & Sustainable Solutions
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            We deliver cutting-edge, environmentally responsible solutions across three core divisions.
          </p>
        </div>
      </section>

      {/* Solutions Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {divisions.map((division) => (
              <div
                key={division.id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300 text-center flex flex-col"
              >
                <FontAwesomeIcon
                  icon={division.icon}
                  className="text-6xl text-green-600 mb-6 mx-auto"
                />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{division.title}</h3>
                <p className="text-gray-600 mb-8 flex-1">{division.description}</p>
                <Link
                  to={division.link}
                  className="text-green-600 font-semibold hover:underline mt-auto"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional CTA Section (added for better flow) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Start Your Sustainable Journey?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Contact us for a free consultation and discover how our solutions can benefit you.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-green-700 shadow-md transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Solutions;