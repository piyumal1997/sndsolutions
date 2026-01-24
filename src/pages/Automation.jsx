// src/pages/Automation.jsx
import { divisions } from '../data/divisions';

const Automation = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12 text-green-900">{divisions[1].title}</h1>
        <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-16">
          {divisions[1].details}<br />
        </p>
        <p className="text-xl text-left text-gray-600 max-w-4xl mx-auto mb-16">
          Our Services Include:<br />
          {divisions[1].services.map((service, index) => (
            <span key={index}>
              <li>{service}</li>
              
            </span>
          ))}
        </p>
        <div className="text-center">
          <a href="/contact" className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-green-700 transition">Discuss Automation Project</a>
        </div>
      </div>
    </section>
  );
};

export default Automation;