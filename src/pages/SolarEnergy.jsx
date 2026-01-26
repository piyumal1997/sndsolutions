// src/pages/SolarEnergy.jsx (Updated – Uses SubDivisionCard for Sub Divisions)
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faHome,
  faIndustry,
} from '@fortawesome/free-solid-svg-icons';
import Calculator from '../components/ui/Calculator';
import SolarSubdivisionCard from '../components/ui/SolarSubdivisionCard';
import { divisions } from '../data/divisions';

import solarBg from '../assets/images/solar-bg.jpg'; 

const SolarEnergy = () => {
  const solarSubdivisions = divisions[0]?.subdivisions || []; // Safeguard for data

  return (
    <main className="pt-0">
      {/* Hero Section – Styled like Home.jsx */}
      <section className="relative h-70 pt-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed" 
          style={{ backgroundImage: `url(${solarBg})` }} // Use imported image; fallback to URL if needed: 'url("https://thumbs.dreamstime.com/b/solar-panel-alternative-energy-rural-villages-thailand-solar-panel-palm-tree-silhouette-reflection-157102155.jpg")'
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-6 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Solar & Energy Systems Division</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
              Delivering complete solar power solutions for homes, businesses, and industries focused on performance, reliability, and long-term savings.
            </p>
          </div>
        </div>
      </section>

      {/* Division Overview */}
      <section className="py-15 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At S & D Solutions (Pvt) Ltd, we specialize in innovative solar and energy systems across Sri Lanka. 
            With a focus on renewable energy, we provide tailored solutions for residential and industrial needs, 
            promoting sustainability and efficiency.
          </p>
        </div>
      </section>

      {/* Subdivisions – Now using SubDivisionCard */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-900">Our Solar Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solarSubdivisions.map((subdivision, index) => (
              <SolarSubdivisionCard
                key={index}
                subdivision={subdivision}
                to={index === 0 ? '/solar-home' : '/solar-industry'}
                icon={index === 0 ? faHome : faIndustry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Solar Savings Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-900">Solar Savings Calculator</h2> */}
          <div className="max-w-4xl mx-auto">
            <Calculator />
          </div>
          <p className="text-center text-gray-600 mt-8 max-w-2xl mx-auto">
            Estimate your potential savings with our interactive solar calculator. Input your details for a customized report.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SolarEnergy;