// src/pages/SolarIndustry.jsx
import React from 'react';
import { divisions } from '../data/divisions';

const SolarIndustry = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12 text-green-900">{divisions[0].subdivisions[1].title}</h1>
        <p className="text-xl text-justify text-gray-600 max-w-4xl mx-auto mb-16">
          {divisions[0].subdivisions[1].details[0]}<br />
          {divisions[0].subdivisions[1].details[1]}<br />
        </p>
        {/* Add more content, images, case studies if needed */}
        <div className="text-center">
          <a href="/contact" className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-green-700 transition">Get Industrial Quote</a>
        </div>
      </div>
    </section>
  );
};

export default SolarIndustry;