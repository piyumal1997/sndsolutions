// src/pages/About.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faRobot,
  faGears,
  faHelmetSafety,
  faMapMarkedAlt,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const divisions = [
    {
      id: 1,
      title: "Solar & Energy Systems",
      content: "Innovative solar power solutions for residential, commercial, and industrial applications, promoting renewable energy across Sri Lanka.",
      icon: faSun,
    },
    {
      id: 2,
      title: "Advanced Engineering & Automation",
      content: "Cutting-edge automation, control systems, and smart engineering solutions for enhanced efficiency and productivity.",
      icon: faRobot,
    },
    {
      id: 3,
      title: "General Engineering",
      content: "Comprehensive engineering services, custom fabrication, and project management tailored to diverse client needs.",
      icon: faGears,
    },
  ];

  const achievements = [
    {
      id: 1,
      value: "800+",
      label: "Projects Completed",
      icon: faHelmetSafety,
    },
    {
      id: 2,
      value: "80+ MW",
      label: "Solar Capacity Installed",
      icon: faSun,
    },
    {
      id: 3,
      value: "All Provinces",
      label: "Island-Wide Coverage",
      icon: faMapMarkedAlt,
    },
    {
      id: 4,
      value: "15+",
      label: "Years of Excellence",
      icon: faTrophy,
    },
  ];

  return (
    <main className="pt-0">
      {/* Hero Section */}
      <section className="relative h-84 bg-gradient-to-r from-green-700 to-emerald-700 flex items-center justify-center">
        {/* <div className="absolute inset-0 bg-black/40"></div> */}
        <div className="container mx-auto px-6 z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About S & D Solutions (Pvt) Ltd.</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Leading provider of sustainable energy and advanced engineering solutions across Sri Lanka
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-15 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We specialize in innovative and sustainable development solutions across three major core sectors: <br />
            Solar & Energy Systems, Advanced Engineering & Automation, and Heavy & General Engineering.<br />
            With 15 years of experience serving Sri Lanka, we are committed to quality, efficiency, and environmental responsibility.
          </p>
        </div>
      </section>

      {/* Core Divisions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-900">Our Core Divisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {divisions.map((division) => (
              <div key={division.id} className="bg-gray-50 rounded-xl shadow-md p-8 hover:shadow-lg transition duration-300 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <FontAwesomeIcon icon={division.icon} className="text-green-600 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-900">{division.title}</h3>
                <p className="text-gray-600">{division.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-900">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((ach) => (
              <div key={ach.id} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <FontAwesomeIcon icon={ach.icon} className="text-green-600 text-3xl" />
                </div>
                <p className="text-4xl font-bold text-green-700">{ach.value}</p>
                <p className="text-gray-600 mt-2">{ach.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;