import PageWrapper from '../../components/PageWrapper';
import Navigation from '../../components/Navigation';
import { motion } from 'framer-motion';

// Sponsors configuration (duplicate from AboutPage for now)
const sponsors = [
  {
    name: 'Mahindra',
    logo: '/assets/sponsors/mahindra.png',
    description: "Presenting partner for Bootstrap, showcasing flagship EVs and supporting our seniors' SAE Baja journey."
  },
  {
    name: 'BMW Motorrad',
    logo: '/assets/sponsors/bmw-motorrad.svg',
    description: 'Presenting partner for Bootstrap, featuring high-performance racing bikes and the BMW CE 02 electric bike with live ride experiences.'
  },
  {
    name: 'SOLIDWORKS',
    logo: '/assets/sponsors/solidworks.svg',
    description: 'Trusted partner supporting our SAE Baja participation with professional software licenses and technical backing.'
  },
  {
    name: 'Xylem',
    logo: '/assets/sponsors/xylem.svg',
    description: 'Global leader in sensors and water solutions, partnering with us and Dept. of ECE for the EmbedX 2.0 hardware challenge.'
  },
  {
    name: 'Ather Energy',
    logo: '/assets/sponsors/ather-energy.png',
    description: 'EV innovator and partner for Ignition 1.0, enabling students to explore product development, embedded systems, and IoT.'
  },
];

export default function SponsorsPage() {
  return (
    <PageWrapper variant="hero" className="min-h-screen bg-gradient-black flex flex-col">
      <Navigation />
      <section className="flex-1 flex flex-col justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Sponsors Page</h1>
          <p className="text-lg text-gray-300 mb-6">This page is locked.<br/>Sponsor details coming soon!</p>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
