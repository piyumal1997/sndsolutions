import { faSolarPanel, faMicrochip, faIndustry } from '@fortawesome/free-solid-svg-icons';

//Images
import solar from '../assets/images/solar.jpg';


export const divisions = [
  {
    id: 1,
    title: 'Solar & Energy Systems',
    subtitle: 'Complete Solar Power Solutions',
    description: 'Focused on performance, reliability, and long-term savings.',
    image: [solar],
    link: '/solar-energy',
    icon: faSolarPanel
  },
  {
    id: 2,
    title: 'Advanced Engineering',
    subtitle: 'Smart Industrial Technologies',
    description: 'Industry 4.0, PLC/SCADA, IoT solutions.',
    image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    link: '/automation',
    icon: faMicrochip
  },
  {
    id: 3,
    title: 'Heavy and General Engineering',
    subtitle: 'Reliable Engineering Services',
    description: 'Fabrication, maintenance, and structural works.',
    image: 'https://images.unsplash.com/photo-1581092160607-36e2b9fd435d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    link: '/engineering',
    icon: faIndustry
  }
];