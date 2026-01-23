import proj1 from '../assets/projects/residential-solar-1.jpg';
import proj2 from '../assets/projects/residential-solar-2.jpg';
import proj3 from '../assets/projects/industrial-solar-1.jpg';
import proj4 from '../assets/projects/industrial-solar-2.jpg';
import proj5 from '../assets/projects/automation-1.jpg';
import proj6 from '../assets/projects/automation-2.jpg';
import proj7 from '../assets/projects/engineering-1.jpg';
import proj8 from '../assets/projects/engineering-2.jpg';
// Add more imports as you have images...

export const projects = [
  {
    id: 1,
    title: '10 kW Residential Rooftop Solar System',
    description: 'Grid-tied home solar installation in Colombo with net metering.',
    type: 'solar-home', // For filtering: solar-home, solar-industry, automation, engineering
    date: '2025-11-15', // ISO date for time-based filtering
    images: [proj1, proj2], // Array for gallery modal
    details: 'Complete design, installation, and commissioning with battery backup option. Reduced monthly bill by 95%.'
  },
  {
    id: 2,
    title: '500 kW Industrial Solar Plant',
    description: 'Large-scale rooftop system for manufacturing facility.',
    type: 'solar-industry',
    date: '2025-09-20',
    images: [proj3, proj4],
    details: 'Hybrid system with remote monitoring. Significant cost savings and sustainability contribution.'
  },
  {
    id: 3,
    title: 'Factory Automation & SCADA Implementation',
    description: 'Full PLC and SCADA integration for production line.',
    type: 'automation',
    date: '2025-07-10',
    images: [proj5],
    details: 'Increased efficiency by 30% with real-time monitoring and predictive maintenance.'
  },
  {
    id: 4,
    title: 'Heavy Steel Fabrication for Warehouse',
    description: 'Structural steel works and machinery installation.',
    type: 'engineering',
    date: '2025-05-05',
    images: [proj7, proj8],
    details: 'Custom fabrication meeting safety standards with on-time delivery.'
  },
  {
    id: 5,
    title: '5 kW Home Solar with Battery Storage',
    description: 'Off-grid capable residential system in rural area.',
    type: 'solar-home',
    date: '2025-03-18',
    images: [proj1],
    details: 'Hybrid setup providing backup during outages.'
  },
  {
    id: 6,
    title: 'IoT Automation for Smart Factory',
    description: 'Industry 4.0 solution with sensors and data analytics.',
    type: 'automation',
    date: '2025-01-12',
    images: [proj6],
    details: 'Real-time data monitoring and process optimization.'
  },
  // Add more projects as needed...
];