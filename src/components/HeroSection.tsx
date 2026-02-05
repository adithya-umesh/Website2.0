"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import DomainModal from './DomainModal'
import { domains, type DomainData } from '@/data/domains'

/**
 * HeroSection Component
 * 
 * Full-screen hero section with:
 * - Revolving 3D gokart background (model-viewer)
 * - Main brand headline with orange gradient highlight
 * - Domain pills with modal popups
 * - Ignition-style "Start Engine" CTA button
 * 
 * Mobile optimization: Text scales responsively, reduced animation complexity
 */

export default function HeroSection() {
  const [activeDomain, setActiveDomain] = useState<DomainData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Load model-viewer script once
    if (!document.getElementById('model-viewer-script')) {
      const s = document.createElement('script')
      s.id = 'model-viewer-script'
      s.type = 'module'
      s.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
      document.head.appendChild(s)
    }

    // Temporarily disabled - will be added in next release
    // const bg = document.getElementById('bg-gokart')
    // if (bg) {
    //   // inject a full-bleed model-viewer as a subtle background element
    //   // expected model path: public/models/gokart.glb
    //   // Note: auto-rotate removed so the parent container's rotation controls the visual spin
    //   bg.innerHTML = `
    //     <model-viewer
    //       src="/models/gokart.glb"
    //       alt="Gokart 3D Model"
    //       camera-controls
    //       touch-action="pan-y"
    //       exposure="1"
    //       shadow-intensity="0.8"
    //       style="width:140%; height:140%; opacity:0.06; transform: translate3d(-20%, -10%, 0); object-fit:cover;"
    //     ></model-viewer>
    //   `
    // }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-black">
      {/* Background revolving 3D gokart */}
      <motion.div
        id="bg-gokart"
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ transformOrigin: '50% 50%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />

      {/* 3D Background + overlays */}
      <div className="absolute inset-0">
        {/* 3D scene in its own low z-index, non-interactive layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* 3D scene removed */}
        </div>

        {/* Soft dark overlay + subtle blur to make foreground readable */}
        <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm" />

        {/* removed: 3D Model badge moved to Interactive Tech section */}
      </div>

      {/* Enhanced Content Overlay */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.h1 
            className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white leading-tight tracking-wide modern-title px-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Welcome to{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange relative inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 40px rgba(255, 107, 53, 0.8)'
              }}
              transition={{ duration: 0.3 }}
            >
              VEGAVATH
              {/* Holographic sweep effect - hidden on mobile for performance */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent hidden md:block"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light modern-body px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <span className="text-white font-semibold">Life At</span>
            {' '}
            <motion.span
              className="text-primary-orange font-semibold"
              whileHover={{
                scale: 1.06,
                textShadow: '0 0 14px rgba(249,115,22,0.95)'
              }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              Full Throttle
            </motion.span>
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-3 sm:gap-4 text-base md:text-lg mt-12 modern-body"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {domains.map((domain, index) => (
              <motion.button
                key={domain.id}
                onClick={() => {
                  setActiveDomain(domain)
                  setIsModalOpen(true)
                }}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-orange-500 text-white font-semibold rounded-full border border-orange-400 hover:bg-orange-600 transition-all duration-300 cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: '0 10px 20px rgba(249, 115, 22, 0.3)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {domain.title}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="pt-8 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <Link href="/join">
              <motion.button
                className="
                  group relative
                  w-28 h-28 sm:w-32 sm:h-32
                  rounded-full
                  bg-gradient-to-br from-orange-500 via-orange-600 to-red-600
                  text-white font-bold
                  flex items-center justify-center
                  uppercase tracking-wider text-sm sm:text-base
                  shadow-[0_0_40px_rgba(249,115,22,0.45)]
                  overflow-hidden
                "
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 70px rgba(249, 105, 22, 0.9)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Outer ignition ring */}
                <div className="absolute inset-0 rounded-full border-4 border-white/20" />

                {/* Rotating glow ring */}
                <motion.div
                  className="absolute inset-2 rounded-full border border-white/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Pulse glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/10"
                  animate={{ opacity: [0.1, 0.25, 0.1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />

                {/* Text */}
                <span className="relative z-10 text-center leading-tight">
                  Start<br />Engine
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      
      {/* Enhanced Interactive Elements */}
  <div className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="absolute inset-0 border border-orange-400/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 border border-orange-400/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-16 border border-purple-400/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* (side card removed - gokart is now the background element) */}
      
      {/* Floating particles - using fixed positions to avoid hydration errors */}
      {[
        { left: 58.93, top: 74.15, duration: 5.2, delay: 1.3 },
        { left: 30.25, top: 23.58, duration: 4.8, delay: 2.1 },
        { left: 35.92, top: 48.19, duration: 5.5, delay: 0.7 },
        { left: 74.08, top: 20.99, duration: 4.3, delay: 3.2 },
        { left: 79.04, top: 70.12, duration: 5.8, delay: 1.8 },
        { left: 43.80, top: 58.38, duration: 4.6, delay: 2.5 },
        { left: 63.11, top: 20.01, duration: 5.1, delay: 0.9 },
        { left: 79.80, top: 61.06, duration: 4.9, delay: 3.7 },
        { left: 56.98, top: 28.14, duration: 5.3, delay: 1.5 },
        { left: 74.73, top: 53.39, duration: 4.7, delay: 2.8 },
        { left: 60.20, top: 60.01, duration: 5.6, delay: 0.4 },
        { left: 65.55, top: 47.19, duration: 4.4, delay: 3.4 },
      ].map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Racing Track Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
        {/* Checkered pattern */}
        <div className="absolute bottom-4 right-8 w-16 h-8 opacity-30">
          <div className="grid grid-cols-4 grid-rows-2 h-full">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-white' : 'bg-gray-900'}`}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Domain Modal */}
      <DomainModal
        domain={activeDomain}
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
    </section>
  )
}