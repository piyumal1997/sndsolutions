// src/pages/SolarEnergy.jsx (Main Solar Division Page)
import { Link } from 'react-router-dom';
import Calculator from '../components/ui/Calculator';
import { divisions } from '../data/divisions';

const SolarEnergy = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12 text-green-900">Solar & Energy Systems Division</h1>
        <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-16">
          At S & D Solutions (Pvt) Ltd, we deliver complete solar power solutions for homes, businesses, and industries focused on performance, reliability, and long-term savings.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Link to="/solar-home" className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition text-center">
            <h3 className="text-2xl font-semibold mb-6">{divisions[0].subdivisions[0].title}</h3>
            <p className="text-gray-600">{divisions[0].subdivisions[0].description}</p>
          </Link>
          <Link to="/solar-industry" className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition text-center">
            <h3 className="text-2xl font-semibold mb-6">{divisions[0].subdivisions[1].title}</h3>
            <p className="text-gray-600">{divisions[0].subdivisions[1].description}</p>
          </Link>
        </div>

        <Calculator />
      </div>
    </section>
  );
};

export default SolarEnergy;