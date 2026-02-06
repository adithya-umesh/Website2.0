
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import Link from 'next/link'

/**
 * ScrollingSection Component
 * 
 * Contains all scrollable sections below the hero:
 * 
 * 1. ABOUT SECTION
 *    - Club mission statement
 *    - Key stats (Projects, Members, Events, Awards)
 *    - Intersection observer for scroll animations
 * 
 * 2. DOMAINS SECTION
 *    - Five technical domains (Automotive, Robotics, Design, Media, Marketing)
 *    - Card grid with hover effects
 *    - Racing-themed descriptions
 * 
 * 3. FEATURES/TECH SECTION (if present)
 *    - Showcase of club capabilities
 *    - Interactive tech demos
 * 
 * 4. CTA SECTION
 *    - Final call-to-action
 *    - Links to Join, Events, About pages
 * 
 * Future insertion points:
 * - Vegavath OS Window (between About and Domains)
 * - Event Promo Cards (between Domains and CTA)
 * 
 * Mobile optimization: Reduced parallax effects, responsive grid layouts
 */

export default function ScrollingSection() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -50])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [domainsRef, domainsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const domains = [
    {
      name: 'Automotive',
      description: 'Designing and building high-performance racing vehicles, from go-karts to advanced automotive systems.',
      icon: '🏎️',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Building the fastest machines on wheels'
    },
    {
      name: 'Robotics',
      description: 'Creating intelligent autonomous racing systems and cutting-edge robotics solutions.',
      icon: '🤖',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Racing toward the future with AI'
    },
    {
      name: 'Design',
      description: 'Crafting aerodynamic designs and racing aesthetics with modern principles.',
      icon: '🎨',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Designing for speed and style'
    },
    {
      name: 'Media',
      description: 'Capturing the thrill of racing and producing high-octane multimedia experiences.',
      icon: '📸',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Broadcasting the excitement'
    },
    {
      name: 'Marketing',
      description: 'Building brand presence in motorsports and creating championship-level campaigns.',
      icon: '📈',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Marketing at racing speed'
    }
  ]

  return (
    <div className="relative bg-gradient-black">
      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-24 md:py-32 relative">
        {/* Textured Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(255, 53, 255, 0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 48%, rgba(255, 107, 53, 0.05) 49%, rgba(255, 107, 53, 0.05) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 255, 255, 0.05) 49%, rgba(0, 255, 255, 0.05) 51%, transparent 52%)
              `,
              backgroundSize: '200px 200px, 250px 250px, 180px 180px, 60px 60px, 60px 60px'
            }}
          />
        </div>
        
        {/* Carbon fiber pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.1) 2px,
                  rgba(255, 107, 53, 0.1) 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.1) 2px,
                  rgba(255, 107, 53, 0.1) 4px
                )
              `
            }}
          />
        </div>

        <motion.div 
          ref={aboutRef}
          style={{ y: y1 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl min-[400px]:text-5xl md:text-6xl font-heading font-bold text-white mb-8 modern-title"
          >
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Vegavath
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-12 modern-body"
          >
            Vegavath is more than just a technical club—we&apos;re a community of innovators, 
            creators, and dreamers pushing the boundaries of technology. Founded with a vision 
            to bridge the gap between theoretical knowledge and practical application, we work 
            across multiple domains to create solutions that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-orange font-heading">85</div>
              <div className="text-gray-400 modern-body">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-orange font-heading">10+</div>
              <div className="text-gray-400 modern-body">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-orange font-heading">6</div>
              <div className="text-gray-400 modern-body">Domains</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
          FUTURE INSERTION POINT: VEGAVATH OS WINDOW
          ========================================
          
          Desktop: Interactive OS-style window with tabs/widgets
          - Live stats dashboard
          - Event countdown timers  
          - Quick actions (Join, Register, Docs)
          - Terminal-style command palette
          
          Mobile: Static hero image or simplified card
          - Single CTA card with branding
          - No interactive elements (performance)
          
          Expected location: Between About and Domains sections
          Component: <VegavathOSWindow /> (not yet implemented)
      ========================================= */}

      {/* Domains Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-24 md:py-32 relative">
        {/* Textured Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(255, 53, 255, 0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 48%, rgba(255, 107, 53, 0.05) 49%, rgba(255, 107, 53, 0.05) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 255, 255, 0.05) 49%, rgba(0, 255, 255, 0.05) 51%, transparent 52%)
              `,
              backgroundSize: '200px 200px, 250px 250px, 180px 180px, 60px 60px, 60px 60px'
            }}
          />
        </div>
        
        {/* Carbon fiber pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.1) 2px,
                  rgba(255, 107, 53, 0.1) 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.1) 2px,
                  rgba(255, 107, 53, 0.1) 4px
                )
              `
            }}
          />
        </div>

        <motion.div 
          ref={domainsRef}
          style={{ y: y2 }}
          className="max-w-6xl mx-auto relative z-10"
        >
          {/* Upcoming Event Card */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl min-[400px]:text-5xl md:text-6xl font-bold text-white mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-orange">
                Upcoming Event
              </span>
            </h2>

            <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 p-8 rounded-xl border border-orange-500/40">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">EmbedX 2.0</h3>
              <p className="text-base sm:text-lg text-gray-300 mb-6">
                Hardware and embedded systems event - registrations opening soon
              </p>
              <Link href="/embedx-2">
                <button className="px-8 py-3 bg-gradient-orange text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
                  View Event
                </button>
              </Link>
            </div>
          </div>

          {/* Recent Event Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={domainsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mt-16 sm:mt-20 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl min-[400px]:text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-orange">
                Recent Event
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              <span className="font-semibold text-orange-400">Ignition 1.0</span> was our flagship 18-hour coding and hardware marathon
              that brought together the fastest minds to build groundbreaking solutions.
              Thank you to all participants who made this event a success!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch mb-12">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border border-gray-500/30">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Status</h3>
                <p className="text-gray-500 text-sm">Event Completed</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border border-gray-500/30">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">150+</h3>
                <p className="text-gray-500 text-sm">Participants</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border border-gray-500/30">
                <div className="text-3xl mb-3">📅</div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Nov 2025</h3>
                <p className="text-gray-500 text-sm">Event held</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <motion.a
                href="/ignition"
                className="group relative inline-block px-8 py-4 bg-gray-700 text-gray-400 font-semibold rounded-lg overflow-hidden cursor-default opacity-75"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>View Details</span>
                  <span className="text-xl">📋</span>
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Interactive 3D Section */}
          <motion.div
            className="mt-12 sm:mt-16 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={domainsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Textured Background for Interactive Section */}
            <div className="absolute inset-0 opacity-15 rounded-xl">
              <div 
                className="w-full h-full rounded-xl"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 50% 20%, rgba(255, 53, 255, 0.1) 0%, transparent 50%),
                    linear-gradient(45deg, transparent 48%, rgba(0, 255, 255, 0.05) 49%, rgba(0, 255, 255, 0.05) 51%, transparent 52%),
                    linear-gradient(-45deg, transparent 48%, rgba(255, 107, 53, 0.05) 49%, rgba(255, 107, 53, 0.05) 51%, transparent 52%)
                  `,
                  backgroundSize: '150px 150px, 200px 200px, 120px 120px, 40px 40px, 40px 40px'
                }}
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl min-[400px]:text-3xl font-bold text-white text-center mb-8">
                Experience Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-orange">
                  Interactive Tech
                </span>
              </h3>
              {/* Overlay badge for the 3D Model Coming Soon */}
              <div className="relative">
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="px-6 py-4 bg-gradient-to-r from-orange-500/30 to-red-500/30 backdrop-blur-xl border border-orange-500/40 rounded-2xl shadow-2xl flex items-center gap-4 animate-pulse">
                    <span className="text-3xl">🏎️</span>
                    <div className="text-base text-gray-100">
                      <div className="font-bold tracking-wide">3D Model</div>
                      <div className="text-orange-200 font-semibold">Coming Soon</div>
                    </div>
                  </div>
                </div>
                {/* (3D scene would be here) */}
                {/* <Interactive3DScene /> */}
                <div className="opacity-40 select-none" style={{height: '220px'}}></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
          FUTURE INSERTION POINT: EVENT PROMO CARDS
          ========================================
          
          Horizontal scrolling card carousel showcasing upcoming/past events:
          - Ignition (Hackathon)
          - Workshops
          - Competitions
          - Tech Talks
          
          Each card links to /events/[slug] route (not yet implemented)
          
          Card data structure:
          - Event title
          - Date/time
          - Registration status (Open/Closed/Completed)
          - Featured image
          - Quick CTA (Register/Learn More)
          
          Mobile: Swipeable cards, 1-2 visible at a time
          Desktop: 3-4 cards visible, smooth scroll navigation
          
          Expected location: Between Domains and CTA sections
          Component: <EventPromoCarousel /> (not yet implemented)
      ========================================= */}

      {/* CTA Section */}
      <section className="flex items-center justify-center px-4 py-20 relative">
        {/* Textured Background for CTA Section */}
        <div className="absolute inset-0 opacity-18">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 60% 40%, rgba(255, 107, 53, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 53, 255, 0.12) 0%, transparent 50%),
                linear-gradient(45deg, transparent 48%, rgba(255, 107, 53, 0.06) 49%, rgba(255, 107, 53, 0.06) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 255, 255, 0.06) 49%, rgba(0, 255, 255, 0.06) 51%, transparent 52%)
              `,
              backgroundSize: '180px 180px, 220px 220px, 160px 160px, 50px 50px, 50px 50px'
            }}
          />
        </div>
        
        {/* Carbon fiber pattern overlay */}
        <div className="absolute inset-0 opacity-12">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.12) 2px,
                  rgba(255, 107, 53, 0.12) 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.12) 2px,
                  rgba(255, 107, 53, 0.12) 4px
                )
              `
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl min-[400px]:text-5xl md:text-6xl font-bold text-white mb-8"
          >
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Join Us?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-12"
          >
            Be part of a community that&apos;s shaping the future of technology. 
            Whether you&apos;re a beginner or an expert, there&apos;s a place for you at Vegavath.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/join">
              <button className="group relative px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Join Our Racing Team</span>
                  <span className="text-xl">🏁</span>
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                {/* Racing stripes */}
                <div className="absolute top-0 left-0 w-1 h-full bg-white/30 transform -skew-x-12"></div>
                <div className="absolute top-0 left-2 w-1 h-full bg-white/20 transform -skew-x-12"></div>
              </button>
            </Link>
            
            <Link href="/gallery">
              <button className="group relative px-8 py-4 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:text-white">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>View Racing Gallery</span>
                  <span className="text-xl">📸</span>
                </span>
                <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </Link>
            <Link href="/sponsors">
              <button className="group relative px-8 py-4 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:text-white">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Become a Sponsor</span>
                  <span className="text-xl">🤝</span>
                </span>
                <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}