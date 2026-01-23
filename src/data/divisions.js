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
    icon: faSolarPanel
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