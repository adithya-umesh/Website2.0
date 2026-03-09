'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import PageWrapper from '../../components/PageWrapper';

const sponsors = [
  {
    name: 'Mahindra',
    logo: '/assets/sponsors/mahindra.png',
    description: 'Presented flagship EVs during Bootstrap and supported our SAE Baja participation.',
  },
  {
    name: 'BMW Motorrad',
    logo: '/assets/sponsors/bmw-motorrad.svg',
    description: 'Showcased performance motorcycles and the BMW CE 02 electric bike during Bootstrap.',
  },
  {
    name: 'SOLIDWORKS',
    logo: '/assets/sponsors/solidworks.svg',
    description: 'Provided software licenses and technical support for SAE Baja.',
  },
  {
    name: 'Xylem',
    logo: '/assets/sponsors/xylem.svg',
    description: 'Partnered with us and ECE for the EmbedX 2.0 hardware challenge.',
  },
  {
    name: 'Ather Energy',
    logo: '/assets/sponsors/ather-energy.png',
    description: 'Supported Ignition 1.0 hackathon and promoted EV innovation among students.',
  },
]

export default function SponsorsPage() {
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <PageWrapper variant="hero" className="min-h-screen bg-gradient-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        {/* Racing circuit background */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <motion.path
              d="M 0 200 Q 300 100 600 200 T 1200 200"
              stroke="url(#sponsorHeroGradient)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />
            <defs>
              <linearGradient id="sponsorHeroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF4500" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 modern-title"
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4)',
            }}
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Sponsors
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;re grateful to the partners who believe in our vision and support our mission
            to create the next generation of innovative engineers.
          </motion.p>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section ref={gridRef} className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 50 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group flex flex-col relative overflow-hidden"
              >
                {/* Racing stripe accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />

                {/* Logo container */}
                <div className="h-32 flex items-center justify-center mb-5">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter md:grayscale md:group-hover:grayscale-0 transition-all duration-300 opacity-70 md:opacity-70 group-hover:opacity-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-400 text-sm text-center font-medium">${sponsor.name}</span>`;
                      }
                    }}
                  />
                </div>

                {/* Name and description */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {sponsor.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {sponsor.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}
