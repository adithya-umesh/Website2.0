'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import HeroSection from './HeroSection'
import ScrollingSection from './ScrollingSection'
import Navigation from './Navigation'

/**
 * HomePage Component
 * 
 * Main orchestrator for the home page experience.
 * 
 * Structure:
 * 1. LoadingScreen - Animated splash (4s, first session only)
 * 2. Navigation - Sticky header with site links
 * 3. HeroSection - Full-screen hero with 3D background
 * 4. ScrollingSection - About, Stats, Domains, CTA sections
 * 
 * Session-based loading: Loading animation shows once per browser session
 * to improve UX for returning visitors navigating back to home.
 */

export default function HomePage() {
  return (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Navigation />
      <div className="w-full px-0">
        <HeroSection />
        <ScrollingSection />
      </div>
    </motion.div>
  )
}