import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gradient-black flex flex-col">
      <Navigation />
      <div className="flex-1 relative">
        {/* Overlay lock message */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-black/80 p-10 rounded-2xl border border-orange-500/30 shadow-xl"
          >
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Sponsors Page</h1>
            <p className="text-lg text-gray-300 mb-6">This page is locked.<br/>Sponsor details coming soon!</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
