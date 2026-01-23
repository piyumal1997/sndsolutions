// src/pages/Solutions.jsx
import { Link } from 'react-router-dom';
import { divisions } from '../data/divisions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Solutions = () => {
  return (
    <section className="pt-32 py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12">Our Innovative & Sustainable Solutions</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-20">
          We deliver cutting-edge, environmentally responsible solutions across three core divisions.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {divisions.map(division => (
            <div key={division.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition text-center">
              <FontAwesomeIcon icon={division.icon} className="text-6xl text-green-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{division.title}</h3>
              <p className="text-gray-600 mb-6">{division.description}</p>
              <Link to={division.link} className="text-green-600 font-medium hover:underline">View Details →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;