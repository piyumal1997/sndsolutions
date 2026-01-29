// src/pages/Solutions.jsx (Updated – Uses DivisionCard Component with Chevron Icons)
import { Link } from 'react-router-dom';
import { divisions } from '../data/divisions';
import DivisionCardSolutions from '../components/ui/DivisionCardSolutions'; // Imported common DivisionCard

const Solutions = () => {
  return (
    <main className="pt-0 bg-white">
      {/* Hero Section */}
      <section className="relative h-84 bg-gradient-to-r from-green-700 to-emerald-700 flex items-center justify-center">
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Innovative & Sustainable Solutions
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            We deliver cutting-edge, environmentally responsible solutions across three core divisions.
          </p>
        </div>
      </section>

      {/* Solutions Grid Section – Now using common DivisionCard */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {divisions.map((division) => (
              <DivisionCardSolutions 
                key={division.id} 
                division={division} 
                showChevron={true} // Optional prop to show chevron in link (add to DivisionCard if needed)
              />
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