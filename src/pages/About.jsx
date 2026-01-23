// src/pages/About.jsx
const About = () => {
  return (
    <section className="pt-32 py-20 bg-green-50">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-green-900 mb-8">About S & D Solutions (Pvt) Ltd.</h1>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-12">
          We specialize in innovative and sustainable development solutions across three core divisions: Solar & Energy Systems, Advanced Engineering & Automation, and General Engineering.<br /><br />
          With years of experience serving Sri Lanka, we are committed to quality, efficiency, and environmental responsibility.
        </p>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-4xl font-bold text-green-700">800+</p>
            <p className="text-gray-600 mt-2">Projects Completed</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-4xl font-bold text-green-700">80+ MW</p>
            <p className="text-gray-600 mt-2">Solar Capacity Installed</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-4xl font-bold text-green-700">All Provinces</p>
            <p className="text-gray-600 mt-2">Island-Wide Coverage</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-4xl font-bold text-green-700">15+</p>
            <p className="text-gray-600 mt-2">Years of Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
