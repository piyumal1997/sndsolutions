import { faSolarPanel, faMicrochip, faIndustry } from '@fortawesome/free-solid-svg-icons';

//Images
import solar from '../assets/images/solar.jpg';
import automation from '../assets/images/automation.jpg';
import heavyeng from '../assets/images/heavyeng.jpg';


export const divisions = [
  {
    id: 1,
    title: 'Solar & Energy Systems',
    subtitle: 'Complete Solar Power Solutions',
    description: 'Focused on performance, reliability, and long-term savings.',
    image: [solar],
    link: '/solar-energy',
    icon: faSolarPanel,
    subdivisions: [
      {
        id: 1,
        title: 'Home / Residential Solar Solutions',
        description: 'We offer 5–20 kW on-grid, off-grid, and hybrid rooftop systems, complete with battery storage and expert after-sales service.',
        details: [
                  "Residential Rooftop Systems (5 kW, 10 kW, 20 kW)",
                  "On-grid, Off-grid, and Hybrid Solutions",
                  "High-Performance Battery Energy Storage",
                  "End-to-End Design, Installation, and Commissioning",
                  "Professional After-Sales: Cleaning, Inspection, and Repair"
                ]
      },
      {
        id: 2,
        title: 'Industry Solar Solutions', 
        description: 'Customized large-scale and hybrid installations for factories and commercial buildings.',
        details: [
                  "Infrastructure & Design: We specialize in the engineering and deployment of large-scale rooftop and ground-mounted arrays, utilizing bespoke designs specifically optimized for the structural and energy requirements of factories, warehouses, and commercial facilities. Our technical expertise extends to advanced hybrid configurations, ensuring seamless integration with existing power grids or independent operation.",
                  "Strategic Value & Sustainability : Our industrial solar solutions are a strategic investment designed to substantially mitigate escalating operational costs and shield businesses from energy price volatility. By implementing high-efficiency photovoltaic infrastructure, we empower organizations to achieve their ESG (Environmental, Social, and Governance) targets and demonstrate a clear commitment to corporate sustainability."
                ]
      }
    ]
  },
  {
    id: 2,
    title: 'Advanced Engineering',
    subtitle: 'Smart Industrial Technologies',
    description: 'Industry 4.0, PLC/SCADA, IoT solutions.',
    image: [automation],
    link: '/automation',
    icon: faMicrochip
  },
  {
    id: 3,
    title: 'Heavy and General Engineering',
    subtitle: 'Reliable Engineering Services',
    description: 'Fabrication, maintenance, and structural works.',
    image: [heavyeng],
    link: '/engineering',
    icon: faIndustry
  }
];