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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 modern-title"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-orange">Sponsors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            We are grateful to our partners who believe in our vision and support our mission to create the next generation of innovative engineers.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsors.map((sponsor) => (
              <div key={sponsor.name} className="bg-gray-900/30 border border-gray-700/30 rounded-xl p-6 flex flex-col items-center">
                <div className="h-24 flex items-center justify-center mb-4">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{sponsor.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{sponsor.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <a href="mailto:vegavath@pes.edu" className="inline-block px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
