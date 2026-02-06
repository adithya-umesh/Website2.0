
'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from './Navigation';
import PageWrapper from './PageWrapper';
import DomainModal from './DomainModal';
import { domains as domainData, type DomainData } from '@/data/domains';

// Sponsors configuration
const sponsors = [
  {
    name: 'Mahindra',
    logo: '/assets/sponsors/mahindra.png',
    description: 'Presenting partner for Bootstrap, showcasing flagship EVs and supporting our seniors\' SAE Baja journey.'
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
]

const milestones = [
  { year: '2020', event: 'Vegavath Technical Club Founded', description: 'Started with a vision to bridge academia and industry' },
  { year: '2021', event: 'First Go-Kart Built', description: 'Successfully designed and built our first high-performance go-kart' },
  { year: '2022', event: 'Robotics Division Launch', description: 'Expanded into autonomous systems and robotics development' },
  { year: '2023', event: 'Multi-Domain Excellence', description: 'Achieved recognition across all five technical domains' },
  { year: '2024', event: 'Industry Partnerships', description: 'Established strategic partnerships with leading tech companies' },
]

export default function AboutPage() {
  const [historyRef, historyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [sponsorsRef, sponsorsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeDomain, setActiveDomain] = useState<DomainData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDomainClick = (domainId: string) => {
    const found = domainData.find((d) => d.id === domainId);
    if (found) {
      setActiveDomain(found);
      setIsModalOpen(true);
    }
  };

  return (
    <PageWrapper variant="hero" className="min-h-screen bg-gradient-black">
      <Navigation />
      
      {/* Enhanced Hero Section with Racing Elements */}
      <section className="pt-24 pb-20 px-4 relative overflow-hidden">
        {/* Racing circuit background */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <motion.path
              d="M 0 200 Q 300 100 600 200 T 1200 200"
              stroke="url(#heroGradient)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF4500" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Site maintenance overlay (client) */}
          {/* dynamically renders only when the admin flags the page */}
          {/* lazy-load to avoid SSR imports */}
          <div style={{display: 'none'}} />
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 relative modern-title"
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4), 0 0 60px rgba(255, 107, 53, 0.2)'
            }}
          >
            About{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange relative inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 30px rgba(255, 107, 53, 0.8)'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 107, 53, 0.8)',
                  '0 0 40px rgba(255, 107, 53, 1)',
                  '0 0 20px rgba(255, 107, 53, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Vegavath
              {/* Holographic scan effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              />
            </motion.span>
            
            {/* Floating racing elements */}
            <motion.div
              className="absolute -top-4 -right-4 text-2xl"
              animate={{ 
                rotate: 360,
                y: [-5, 5, -5]
              }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                y: { duration: 2, repeat: Infinity }
              }}
            >
              ⚙️
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 text-2xl"
              animate={{ 
                rotate: -360,
                x: [-3, 3, -3]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                x: { duration: 1.5, repeat: Infinity }
              }}
            >
              🏎️
            </motion.div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed relative"
          >
            Team Vegavath is the official student innovation club of PES University, Electronic City Campus (PESU ECC). Founded by our Mechanical Engineering seniors as a racing team, Vegavath has now evolved into a{' '}
            <motion.span 
              className="text-orange-400 font-semibold"
              whileHover={{ 
                textShadow: '0 0 10px rgba(251, 146, 60, 0.8)',
                scale: 1.05
              }}
            >
              multi-domain student community
            </motion.span>
            {' '}that brings together passionate minds from Computer Science and Electronics backgrounds with a passion for automotives and robotics. We work at the intersection of automation and coding, exploring robotics, automotive engineering, embedded systems and programming.
          </motion.p>

          {/* Racing stats animation */}
          <motion.div
            className="mt-12 flex justify-center space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { label: 'Active Members', value: '85', icon: '👥' },
              { label: 'Projects Completed', value: '10+', icon: '🚀' },
              { label: 'Domains', value: '6', icon: '⚙️' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-3xl mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section - Auto-scrolling Marquee */}
      <section ref={sponsorsRef} className="py-10 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-8 modern-title"
            style={{
              textShadow: '0 0 15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3)'
            }}
          >
            Our{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange"
            >
              Sponsors
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-gray-300 mb-16 max-w-3xl mx-auto modern-body text-lg"
          >
            We&apos;re grateful to our partners who believe in our vision and support our mission 
            to create the next generation of innovative engineers.
          </motion.p>

          {/* Auto-scrolling sponsor logos with descriptions */}
          <div className="relative">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#181818] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#181818] to-transparent z-10 pointer-events-none" />
            {/* Scrolling container */}
            <div className="flex overflow-hidden py-8">
              <motion.div
                className="flex gap-12 items-stretch"
                animate={{
                  x: [0, -2400],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 70,
                    ease: "linear",
                  },
                }}
              >
                {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                  <div
                    key={`${sponsor.name}-${index}`}
                    className="flex-shrink-0 w-80 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group flex flex-col"
                  >
                    {/* Logo container */}
                    <div className="h-32 flex items-center justify-center mb-4">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain filter md:grayscale md:group-hover:grayscale-0 transition-all duration-300 opacity-70 md:opacity-70 group-hover:opacity-100"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<span class="text-gray-400 text-sm text-center font-medium">${sponsor.name}</span>`
                          }
                        }}
                      />
                    </div>
                    {/* Sponsor name and description */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {sponsor.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {sponsor.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <a href="/sponsors" className="group relative px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              <span className="relative z-10">Become a Sponsor</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </motion.div>
        </div>
      </section>
      {/* Enhanced Mission & Vision with Racing Theme */}
      <section className="py-10 px-4 relative">
        {/* Robotic grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 grid-rows-10 h-full w-full">
            {[...Array(200)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-orange-400/20"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 3, 
                  delay: i * 0.01,
                  repeat: Infinity 
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 group"
            >
              <motion.h2 
                className="text-3xl font-bold text-white relative"
                whileHover={{ scale: 1.02 }}
              >
                Our Journey & What We Do
                {/* Digital underline */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.h2>
              
              <motion.p 
                className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                Originally established as a hub for building and racing Go-Karts and Baja vehicles, Vegavath has grown beyond its mechanical roots. Today, we explore the intersection of Coding and Mobility — combining software, hardware, and design thinking to drive innovation in robotics and racing technologies.
              </motion.p>
              
              <motion.div
                className="mt-4 space-y-2 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p><span className="text-orange-400 font-semibold">Racing Heritage</span> – Continuing our tradition of participating in mobility and racing competitions across India.</p>
                <p><span className="text-orange-400 font-semibold">Tech-Driven Projects</span> – Building innovative solutions in Coding, Robotics, AR/VR, and Smart Mobility.</p>
                <p><span className="text-orange-400 font-semibold">Cross-Domain Collaboration</span> – Providing a platform where CSE, ECE, and BBA students work together.</p>
                <p><span className="text-orange-400 font-semibold">Workshops & Hackathons</span> – Organising events that empower students to learn, experiment, and showcase their skills.</p>
              </motion.div>
              
              {/* Mission stats */}
              <motion.div
                className="grid grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { icon: '🔧', label: 'Projects', value: '10+' },
                  { icon: '🏆', label: 'Awards', value: '3+' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="bg-gray-900/30 border border-gray-700/50 rounded-lg p-4 text-center group/stat"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(249, 115, 22, 0.5)'
                    }}
                  >
                    <div className="text-2xl mb-2">
                      {item.icon}
                    </div>
                    <div className="text-orange-400 font-bold text-lg group-hover/stat:text-orange-300">
                      {item.value}
                    </div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 group"
            >
              <motion.h2 
                className="text-3xl font-bold text-white relative"
                whileHover={{ scale: 1.02 }}
              >
                Our Vision
                {/* Digital underline */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.h2>
              
              <motion.p 
                className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                To create a future-ready community where technology, innovation, and teamwork converge — shaping the next generation of leaders in mobility, robotics, and digital transformation.
              </motion.p>
              
              {/* Vision domains */}
              <motion.div
                className="grid grid-cols-1 gap-3 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {domainData.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => handleDomainClick(item.id)}
                    className="flex items-center space-x-3 bg-gray-900/20 border border-gray-700/30 rounded-lg p-3 group/domain w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-500"
                    whileHover={{ 
                      x: 10,
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <motion.span 
                      className="text-lg"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Use emoji or icon if available, fallback to first letter */}
                      {item.icon || item.title[0]}
                    </motion.span>
                    <span className="text-gray-300 group-hover/domain:text-orange-300 transition-colors">
                      {item.title}
                    </span>
                  </motion.button>
                ))}
                <DomainModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} domain={activeDomain} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Club History Timeline with Racing Theme */}
      <section ref={historyRef} className="py-20 px-4 relative">
        {/* Racing track background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <svg viewBox="0 0 1200 800" className="w-full h-full">
            <motion.path
              d="M 0 400 Q 300 200 600 400 T 1200 400"
              stroke="#f97316"
              strokeWidth="6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, delay: 0.5 }}
            />
            <motion.path
              d="M 0 420 Q 300 220 600 420 T 1200 420"
              stroke="#dc2626"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, delay: 1 }}
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={historyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white text-center mb-16 relative"
            style={{
              textShadow: '0 0 15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3)'
            }}
          >
            Our{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange relative inline-block"
              whileHover={{ scale: 1.05 }}
              animate={{
                textShadow: [
                  '0 0 15px rgba(249, 115, 22, 0.8)',
                  '0 0 30px rgba(249, 115, 22, 1)',
                  '0 0 15px rgba(249, 115, 22, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Journey
              {/* Speed lines */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-0.5 bg-orange-400 rounded-full mb-1"
                    animate={{ 
                      opacity: [0, 1, 0],
                      x: [0, 15, 0]
                    }}
                    transition={{ 
                      duration: 1, 
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                ))}
              </div>
            </motion.span>
          </motion.h2>

          <div className="relative">
            {/* Enhanced Timeline Line with Animation */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 to-red-500 hidden md:block"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={historyInView ? { scaleY: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  animate={historyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col group`}
                >
                  <motion.div 
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                    } text-center`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 relative overflow-hidden group-hover:border-orange-500/50 transition-all duration-300"
                      whileHover={{ 
                        boxShadow: '0 10px 30px rgba(249, 115, 22, 0.2)'
                      }}
                    >
                      {/* Racing stripe accent */}
                      <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      />
                      
                      {/* Tech pattern overlay */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                          {[...Array(48)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="border border-orange-400/30"
                              animate={{ 
                                opacity: [0.1, 0.3, 0.1]
                              }}
                              transition={{ 
                                duration: 2, 
                                delay: i * 0.05,
                                repeat: Infinity 
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <motion.h3 
                        className="text-2xl font-bold text-orange-500 mb-2 relative z-10"
                        whileHover={{ scale: 1.05 }}
                      >
                        {milestone.year}
                        {/* Year glow effect */}
                        <motion.span
                          className="absolute inset-0 text-orange-300 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"
                          animate={{ 
                            textShadow: [
                              '0 0 5px rgba(251, 146, 60, 0.5)',
                              '0 0 20px rgba(251, 146, 60, 0.8)',
                              '0 0 5px rgba(251, 146, 60, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {milestone.year}
                        </motion.span>
                      </motion.h3>
                      
                      <h4 className="text-xl font-semibold text-white mb-3 relative z-10">
                        {milestone.event}
                      </h4>
                      
                      <p className="text-gray-300 relative z-10 group-hover:text-gray-200 transition-colors">
                        {milestone.description}
                      </p>

                      {/* Achievement icon */}
                      <motion.div
                        className="absolute top-4 right-4 text-2xl opacity-30 group-hover:opacity-70 transition-opacity"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                      >
                        {index === 0 && '🏁'}
                        {index === 1 && '🏎️'}
                        {index === 2 && '🤖'}
                        {index === 3 && '🏆'}
                        {index === 4 && '🚀'}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Timeline Node */}
                  <motion.div 
                    className="relative z-10 my-4 md:my-0 hidden md:block"
                    initial={{ scale: 0 }}
                    animate={historyInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.3 + 0.5 }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full border-4 border-gray-900 relative"
                      whileHover={{ 
                        scale: 1.3,
                        boxShadow: '0 0 20px rgba(249, 115, 22, 0.8)'
                      }}
                    >
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-orange-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  <div className="w-full md:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section - Auto-scrolling Marquee */}
      <section ref={sponsorsRef} className="py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-8 modern-title"
            style={{
              textShadow: '0 0 15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3)'
            }}
          >
            Our{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange"
            >
              Sponsors
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-gray-300 mb-16 max-w-3xl mx-auto modern-body text-lg"
          >
            We&apos;re grateful to our partners who believe in our vision and support our mission 
            to create the next generation of innovative engineers.
          </motion.p>

          {/* Auto-scrolling sponsor logos with descriptions */}
          <div className="relative">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#181818] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#181818] to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling container */}
            <div className="flex overflow-hidden py-8">
              <motion.div
                className="flex gap-12 items-stretch"
                animate={{
                  x: [0, -2400],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 70,
                    ease: "linear",
                  },
                }}
              >
                {/* Duplicate sponsors array 4 times for seamless loop */}
                {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                  <div
                    key={`${sponsor.name}-${index}`}
                    className="flex-shrink-0 w-80 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group flex flex-col"
                  >
                    {/* Logo container */}
                    <div className="h-32 flex items-center justify-center mb-4">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain filter md:grayscale md:group-hover:grayscale-0 transition-all duration-300 opacity-70 md:opacity-70 group-hover:opacity-100"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<span class="text-gray-400 text-sm text-center font-medium">${sponsor.name}</span>`
                          }
                        }}
                      />
                    </div>
                    
                    {/* Sponsor name and description */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {sponsor.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {sponsor.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button className="group relative px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              <span className="relative z-10">Become a Sponsor</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Values
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Innovation', description: 'Pushing boundaries and thinking outside the box', icon: '💡' },
              { title: 'Excellence', description: 'Striving for the highest standards in everything we do', icon: '🏆' },
              { title: 'Collaboration', description: 'Working together to achieve greater outcomes', icon: '🤝' },
              { title: 'Impact', description: 'Creating meaningful change in technology and society', icon: '🚀' }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}