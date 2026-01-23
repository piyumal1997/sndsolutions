// src/pages/Engineering.jsx
const Engineering = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12 text-green-900">General Engineering Division</h1>
        <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-16">
          At S & D Solutions (Pvt) Ltd, our General Engineering Division provides reliable and practical engineering solutions to support industries, businesses, and infrastructure projects.<br /><br />
          Our Services Include:<br />
          • Mechanical fabrication and installation<br />
          • Utility systems, piping & structural works<br />
          • Equipment maintenance & plant support services<br />
          • Custom machinery modification and repair<br />
          • Technical consulting & on-site engineering support<br /><br />
          We focus on quality workmanship, safety, and long-term performance, delivering cost-effective engineering solutions tailored to your operational needs.
        </p>
        <div className="text-center">
          <a href="/contact" className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-green-700 transition">Inquire About Engineering</a>
        </div>
      </div>
    </section>
  );
};

export default Engineering;