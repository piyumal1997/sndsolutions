// src/pages/SolarIndustry.jsx
const SolarIndustry = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12 text-green-900">Industry Solar Solutions</h1>
        <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-16">
          Large-scale rooftop or ground-mounted systems, hybrid configurations, and customized designs optimized for factories, warehouses, and commercial facilities.<br /><br />
          Our industrial solar solutions help businesses significantly reduce electricity costs while contributing to sustainability goals.
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