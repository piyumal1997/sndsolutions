// src/pages/Automation.jsx
const Automation = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12 text-green-900">Advanced Engineering & Automation Division</h1>
        <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-16">
          Our Advanced Engineering & Automation Division is dedicated to bringing smart, efficient, and future-ready technologies to local industries.<br /><br />
          Our Services Include:<br />
          • Advanced cooling solutions for industrial applications<br />
          • Industrial automation systems (PLC, SCADA, sensors & controls)<br />
          • Innovative product development & custom machine design<br />
          • Industry 4.0 solutions – IoT, data monitoring & smart manufacturing<br />
          • Process optimization and energy-efficient system integration<br /><br />
          We help industries move toward higher productivity, lower energy use, and intelligent operations through modern engineering and automation technologies.
        </p>
        <div className="text-center">
          <a href="/contact" className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-green-700 transition">Discuss Automation Project</a>
        </div>
      </div>
    </section>
  );
};

export default Automation;