import React from 'react';
import { divisions } from '../data/divisions';

const SolarHome = () => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <h1 className="text-5xl font-bold text-center mb-12">{divisions[0].subdivisions[0].title}</h1>
      <p className="text-2xl max-w-4xl mx-auto text-left mb-6">
        Our Services Include:
      </p>
      {divisions[0].subdivisions[0].services.map((service, index) => (
        <p key={index} className="text-xl max-w-4xl mx-auto text-left mb-4">
          • {service}
        </p>
      ))}
      {/* Add images, testimonials, etc. */}
    </div>
  </section>
);

export default SolarHome;